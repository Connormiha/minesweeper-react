// @flow

import schema from 'reducers/schema';
import {getCellNeighbours} from 'helpers/utils';
import {
    FIELD_FILL,
    FIELD_FILL_EMPTY,
    FIELD_OPEN,
    FIELD_MARK,
    FIELD_QUICK_OPEN,
} from './constants';
import immutable from 'immutability-helper';
import fieldGenerator, {fieldGeneratorEmpty} from 'helpers/field-generator';
import type {FieldType, FieldStoreType, FieldFillParams} from 'flux/types';

const openAllowedSiblings = (state: FieldStoreType, id: number): FieldStoreType => {
    const width = state.rowWidth;
    const size = state.field.length;

    const openFieldCell = (id: number) => {
        if (state.field[id].isOpened) {
            return;
        }

        state = immutable(
            state,
            {
                field: {
                    [id]: {
                        isOpened: {$set: true},
                    },
                },
            },
        );

        if (state.field[id].aroundBombCount === 0) {
            for (const i of getCellNeighbours(id, width, size)) {
                openFieldCell(i);
            }
        }
    };

    openFieldCell(id);

    return state;
};

const openCellState = (state: FieldStoreType, id: number): FieldType => {
    state = immutable(
        state,
        {
            field: {
                [id]: {
                    isOpened: {$set: true},
                },
            },
        },
    );

    if (state.field[id].isBomb) {
        state = immutable(
            state,
            {
                field: {
                    [id]: {
                        isDead: {$set: true},
                    },
                },
            },
        );

        state = immutable(
            state,
            {showAllBombs: {$set: true}},
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

export const fill = (field: FieldFillParams, id: number) =>
    ({type: FIELD_FILL, field, id});

export const fillEmpty = (field: FieldFillParams) =>
    ({type: FIELD_FILL_EMPTY, field});

const getDefaultState = (): FieldType =>
    schema.field;

export default (state: FieldStoreType = getDefaultState(), {type, field, id}: any) => {
    let cell;

    switch (type) {
        case FIELD_FILL:
            return {
                ...schema.field,
                isGenerated: true,
                field: fieldGenerator(field.width, field.height, field.minesCount, id),
                rowWidth: field.width,
            };

        case FIELD_FILL_EMPTY:
            return {
                ...schema.field,
                field: fieldGeneratorEmpty(field.width, field.height),
                rowWidth: field.width,
            };

        case FIELD_OPEN:
            cell = state.field[id];

            if (cell.aroundBombCount === 0 && !cell.isBomb) {
                state = openAllowedSiblings(state, id);
            } else {
                state = openCellState(state, id);
            }

            return state;

        case FIELD_MARK:
            cell = state.field[id];

            if (cell.isUnknown) {
                return immutable(
                    state,
                    {
                        field: {
                            [id]: {
                                isUnknown: {$set: false},
                            },
                        },
                    },
                );
            } else if (cell.isFlag) {
                return immutable(
                    state,
                    {
                        field: {
                            [id]: {
                                isUnknown: {$set: true},
                                isFlag: {$set: false},
                            },
                        },
                        flagsCount: {
                            $set: state.flagsCount - 1,
                        },
                    },
                );
            }

            return immutable(
                state,
                {
                    field: {
                        [id]: {
                            isFlag: {$set: true},
                        },
                    },
                    flagsCount: {
                        $set: state.flagsCount + 1,
                    },
                },
            );

        case FIELD_QUICK_OPEN:
            cell = state.field[id];

            if (cell.isOpened && cell.aroundBombCount) {
                let countFlagsAround = 0;
                const neighbours = getCellNeighbours(id, state.rowWidth, state.field.length);

                const emptyCells = neighbours.filter((id) => {
                    const cell = state.field[id];

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
                    emptyCells.forEach((id) => {
                        if (state.field[id].aroundBombCount === 0 && !state.field[id].isBomb) {
                            state = openAllowedSiblings(state, id);
                        } else {
                            state = openCellState(state, id);
                        }
                    });
                }
            }

            return state;
    }

    return state;
};
