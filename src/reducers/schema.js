// @flow

import type {FieldStoreType, GameType} from 'flux/types';

type SchemaType = {|
    game: GameType,
    field: FieldStoreType,
|};

const schema: SchemaType = {
    game: {
        width: 16,
        height: 10,
        minesCount: 30,
        state: 'not-started',
    },
    field: {
        field: [],
        flagsCount: 0,
        openedCount: 0,
        showAllBombs: false,
        isGenerated: false,
    },
};

export default schema;
