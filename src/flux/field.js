// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN} from './constants';
import immutable from 'helpers/immutable';
import fieldGenerator from 'helpers/field-generator';
import type {FieldType, FieldFillParams} from 'flux/types';

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

export const openCell = (id: number) =>
    ({type: FIELD_OPEN, id});

export const fill = (field: FieldFillParams) =>
    ({type: FIELD_FILL, field});

const getDefaultState = (): FieldType =>
    schema.field;

export default (state: FieldType = getDefaultState(), {type, field, id}: any) => {
    switch (type) {
        case FIELD_FILL:
            return fieldGenerator(field.width, field.height, field.minesCount);

        case FIELD_OPEN:
            const width = state[0].length;
            const row = parseInt(id / width, 10);
            const col = id % width;

            if (state[row][col].aroundBombCount === 0 && !state[row][col].isBomb) {
                state = openAllowedSiblings(
                    state.map((item) => item.slice()),
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
    }

    return state;
};
