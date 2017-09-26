// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN, FIELD_MARK, FIELD_QUICK_OPEN} from './constants';
import immutable from 'helpers/immutable';
import fieldGenerator from 'helpers/field-generator';
import type {FieldType, CellType, FieldStoreType, FieldFillParams} from 'flux/types.js.flow';

const openAllowedSiblings = (state: FieldStoreType, row: number, col: number): FieldType => {
    if (row < 0 || row >= state.field.length || col < 0 || col >= state.field[0].length) {
        return state;
    }

    if (state.field[row][col].isOpened) {
        return state;
    }

    state.field[row][col] = {...state.field[row][col], isOpened: true};

    if (state.field[row][col].aroundBombCount === 0) {
        openAllowedSiblings(state, row - 1, col);
        openAllowedSiblings(state, row + 1, col);
        openAllowedSiblings(state, row, col - 1);
        openAllowedSiblings(state, row, col + 1);

        openAllowedSiblings(state, row - 1, col - 1);
        openAllowedSiblings(state, row + 1, col - 1);
        openAllowedSiblings(state, row - 1, col + 1);
        openAllowedSiblings(state, row + 1, col + 1);
    }

    return state;
};

const getCellParams = (state: FieldStoreType, id: number): [number, number, number, CellType] => {
    const width = state.field[0].length;
    const row = parseInt(id / width, 10);
    const col = id % width;
    const cell = state.field[row][col];

    return [width, row, col, cell];
};

const openCellState = (state: FieldStoreType, row: number, col: number): FieldType => {
    state = immutable.setIn(
        state,
        ['field', row, col, 'isOpened'],
        true,
    );

    if (state.field[row][col].isBomb) {
        state = immutable.setIn(
            state,
            ['field', row, col, 'isDead'],
            true,
        );

        state = immutable.set(
            state,
            'showAllBombs',
            true,
        );
    }

    return state;
};

export const openCell = (id: number) =>
    ({type: FIELD_OPEN, id});

export const markCell = (id: number) =>
    ({type: FIELD_MARK, id});

export const quickOpen = (id: number) =>
    ({type: FIELD_QUICK_OPEN, id});

export const fill = (field: FieldFillParams) =>
    ({type: FIELD_FILL, field});

const getDefaultState = (): FieldType =>
    schema.field;

export default (state: FieldStoreType = getDefaultState(), {type, field, id}: any) => {
    let width;
    let row;
    let col;
    let cell;

    switch (type) {
        case FIELD_FILL:
            return {
                ...schema.field,
                field: fieldGenerator(field.width, field.height, field.minesCount),
            };

        case FIELD_OPEN:
            [width, row, col, cell] = getCellParams(state, id);

            if (cell.aroundBombCount === 0 && !cell.isBomb) {
                state = openAllowedSiblings(
                    immutable.asMutable(state, {deep: true}),
                    row,
                    col,
                );
            } else {
                state = openCellState(state, row, col);
            }

            return state;

        case FIELD_MARK:
            [width, row, col, cell] = getCellParams(state, id);

            if (cell.isUnknown) {
                return immutable.setIn(
                    state,
                    ['field', row, col, 'isUnknown'],
                    false,
                );
            } else if (cell.isFlag) {
                state = immutable.setIn(
                    state,
                    ['field', row, col, 'isUnknown'],
                    true,
                );

                return immutable.setIn(
                    state,
                    ['field', row, col, 'isFlag'],
                    false,
                );
            }

            return immutable.setIn(
                state,
                ['field', row, col, 'isFlag'],
                true,
            );

        case FIELD_QUICK_OPEN:
            [width, row, col, cell] = getCellParams(state, id);

            if (cell.isOpened && cell.aroundBombCount) {
                let countFlagsAround = 0;

                const emptyCells = [
                    [row, col + 1],
                    [row, col - 1],
                    [row - 1, col + 1],
                    [row - 1, col],
                    [row - 1, col - 1],
                    [row + 1, col + 1],
                    [row + 1, col],
                    [row + 1, col - 1],
                ].filter(([row, col]) => {
                    if (row < 0 || row >= state.field.length) {
                        return false;
                    }

                    if (col < 0 || col >= width) {
                        return false;
                    }

                    const cell = state.field[row][col];

                    if (cell.isFlag) {
                        countFlagsAround++;

                        return false;
                    }

                    if (!cell.isOpened && !cell.isUnknown) {
                        return true;
                    }

                    return false;
                });

                if (countFlagsAround === cell.aroundBombCount) {
                    emptyCells.forEach(([row, col]) => {
                        if (state.field[row][col].aroundBombCount === 0 && !state.field[row][col].isBomb) {
                            state = openAllowedSiblings(
                                immutable.asMutable(state, {deep: true}),
                                row,
                                col,
                            );
                        } else {
                            state = openCellState(state, row, col);
                        }
                    });
                }
            }

            return state;
    }

    return state;
};
