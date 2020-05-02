export type CellType = number;

export type FieldType = Uint8Array;

export type FieldStoreType = {
    field: FieldType;
    flagsCount: number;
    openedCount: number;
    rowWidth: number;
    showAllBombs: boolean;
    isGenerated: boolean;
};

export type GameState = 'fail' | 'win' | 'in-progress' | 'not-started';

export type GameType = {
    width: number;
    height: number;
    minesCount: number;
    state: GameState;
};

export type FieldFillParams = {
    width: number;
    height: number;
    minesCount: number;
};
