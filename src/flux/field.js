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
                openedCount: {$set: state.openedCount + 1},
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
    if (state.field[id].isOpened) {
        return state;
    }

    state = immutable(
        state,
        {
            field: {
                [id]: {
                    isOpened: {$set: true},
                },
            },
            openedCount: {$set: state.openedCount + 1},
        },
    );

    if (state.field[id].isBomb) {
        return immutable(
            state,
            {
                field: {
                    [id]: {
                        isDead: {$set: true},
                    },
                },
                showAllBombs: {$set: true},
            },
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


type ActionType = {
    id: number,
    type: string,
    field: FieldType,
};

type ActionsType = {
    [string]: (FieldStoreType, ActionType) => FieldStoreType,
};

const actions: ActionsType = {
    [FIELD_FILL](state: FieldStoreType, {field, id}: ActionType) {
        return {
            ...schema.field,
            isGenerated: true,
            field: fieldGenerator(field.width, field.height, field.minesCount, id),
            rowWidth: field.width,
        };
    },

    [FIELD_FILL_EMPTY](state: FieldStoreType, {field}: ActionType) {
        return {
            ...schema.field,
            field: fieldGeneratorEmpty(field.width, field.height),
            rowWidth: field.width,
        };
    },

    [FIELD_OPEN](state: FieldStoreType, action: ActionType) {
        const cell = state.field[action.id];

        if (cell.aroundBombCount === 0 && !cell.isBomb) {
            return openAllowedSiblings(state, action.id);
        }

        return openCellState(state, action.id);
    },

    [FIELD_MARK](state: FieldStoreType, {id}: ActionType) {
        const cell = state.field[id];

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
    },

    [FIELD_QUICK_OPEN](state: FieldStoreType, {id}: ActionType) {
        const cell = state.field[id];

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
    },
};

export default (state: FieldStoreType = getDefaultState(), action: ActionType) => {
    if (actions[action.type]) {
        return actions[action.type](state, action);
    }

    return state;
};
