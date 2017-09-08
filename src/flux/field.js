// @flow

import schema from 'reducers/schema';
import {FIELD_FILL, FIELD_OPEN} from './constants';
import immutable from 'seamless-immutable';
import type {FieldType} from 'flux/types';

const getDefaultState = (): FieldType =>
    schema.field;

export default (state: FieldType = getDefaultState(), {type, field, cell}: any) => {
    switch (type) {
        case FIELD_FILL:
            return field;

        case FIELD_OPEN:
            return immutable.setIn(state, '0', cell);
    }

    return state;
};
