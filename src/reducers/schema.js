// @flow

import type {FieldType} from 'flux/types';
import fieldGenerator from 'helpers/field-generator';

type SchemaType = {
    game: any,
    field: FieldType,
};

const schema: SchemaType = {
    game: {
        width: 20,
        height: 20,
        minesCount: 30,
    },
    field: fieldGenerator(20, 20, 30),
};

export default schema;
