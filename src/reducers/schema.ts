import type {FieldStoreType, GameType} from 'flux/types';

export type SchemaType = {
    game: GameType;
    field: FieldStoreType;
};

const schema: SchemaType = {
  game: {
    width: 16,
    height: 10,
    minesCount: 30,
    state: 'not-started',
  },
  field: {
    field: new Uint8Array(),
    flagsCount: 0,
    openedCount: 0,
    rowWidth: 0,
    showAllBombs: false,
    isGenerated: false,
  },
};

export default schema;
