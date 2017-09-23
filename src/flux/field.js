// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN, FIELD_MARK, FIELD_QUICK_OPEN} from './constants';
import immutable from 'helpers/immutable';
import fieldGenerator from 'helpers/field-generator';
import type {FieldType, FieldFillParams} from 'flux/types.js.flow';

const openAllowedSiblings = (state: FieldType, row: number, col: number): FieldType => {
    if (row < 0 || row >= state.length || col < 0 || col >= state[0].length) {
        return state;
    }

    if (state[row][col].isOpened) {
        return state;
    }

    state[row][col] = Object.assign({}, state[row][col], {isOpened: true});

    if (state[row][col].aroundBombCount === 0) {
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

const getCellParams = (field: FieldFillParams, id: number): [number, number, number] => {
    const width = field[0].length;
    const row = parseInt(id / width, 10);
    const col = id % width;

    return [width, row, col];
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

export default (state: FieldType = getDefaultState(), {type, field, id}: any) => {
    let width;
    let row;
    let col;
    let cell;
    switch (type) {
        case FIELD_FILL:
            return fieldGenerator(field.width, field.height, field.minesCount);

        case FIELD_OPEN:
            [width, row, col] = getCellParams(state, id);

            if (state[row][col].aroundBombCount === 0 && !state[row][col].isBomb) {
                state = openAllowedSiblings(
                    immutable.asMutable(state).map(immutable.asMutable),
                    row,
                    col,
                );
            } else {
                state = immutable.setIn(
                    state,
                    [row, col, 'isOpened'],
                    true,
                );
            }

            return state;

        case FIELD_MARK:
            [width, row, col] = getCellParams(state, id);
            cell = state[row][col];

            if (cell.isUnknown) {
                return immutable.setIn(
                    state,
                    [row, col, 'isUnknown'],
                    false,
                );
            } else if (cell.isFlag) {
                state = immutable.setIn(
                    state,
                    [row, col, 'isUnknown'],
                    true,
                );

                return immutable.setIn(
                    state,
                    [row, col, 'isFlag'],
                    false,
                );
            }

            return immutable.setIn(
                state,
                [row, col, 'isFlag'],
                true,
            );

        case FIELD_QUICK_OPEN:
            [width, row, col] = getCellParams(state, id);
            cell = state[row][col];

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
                    if (row < 0 || row >= state.length) {
                        return false;
                    }

                    if (col < 0 || col >= width) {
                        return false;
                    }

                    const cell = state[row][col];

                    if (cell.isFlag) {
                        countFlagsAround++;

                        return false;
                    }

                    if (cell.isOpened && !cell.isUnknown) {
                        return true;
                    }

                    return false;
                });

                if (countFlagsAround === cell.aroundBombCount) {
                    emptyCells.forEach(([row, col]) => {
                        state = immutable.setIn(state, [row, col, 'isOpened'], true);
                    });
                }
            }

            return state;
    }

    return state;
};
