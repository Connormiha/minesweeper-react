// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN} from './constants';
import immutable from 'helpers/immutable';
import type {FieldType} from 'flux/types';

export const openCell = (id: number) =>
    ({type: FIELD_OPEN, id});

const getDefaultState = (): FieldType =>
    schema.field;

export default (state: FieldType = getDefaultState(), {type, field, id}: any) => {
    switch (type) {
        case FIELD_FILL:
            return field;

        case FIELD_OPEN:
            const height = state.length;

            return immutable.setIn(
                state,
                [parseInt(id / height, 10), id % height, 'isOpened'],
                true,
            );
    }

    return state;
};
