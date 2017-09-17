// @flow

import type {FieldType, GameType} from 'flux/types';
import fieldGenerator from 'helpers/field-generator';

type SchemaType = {
    game: GameType,
    field: FieldType,
};

const schema: SchemaType = {
    game: {
        width: 20,
        height: 20,
        minesCount: 30,
        state: 'not-started',
    },
    field: fieldGenerator(20, 20, 30),
};

export default schema;
