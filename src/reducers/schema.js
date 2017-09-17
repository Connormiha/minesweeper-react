// @flow

import type {FieldType, GameType} from 'flux/types';

type SchemaType = {
    game: GameType,
    field: FieldType,
};

const schema: SchemaType = {
    game: {
        width: 16,
        height: 10,
        minesCount: 30,
        state: 'not-started',
    },
    field: [],
};

export default schema;
