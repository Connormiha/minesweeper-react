// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN} from './constants';
import immutable from 'helpers/immutable';
import fieldGenerator from 'helpers/field-generator';
import type {FieldType, FieldFillParams} from 'flux/types';

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

            return immutable.setIn(
                state,
                [parseInt(id / width, 10), id % width, 'isOpened'],
                true,
            );
    }

    return state;
};
