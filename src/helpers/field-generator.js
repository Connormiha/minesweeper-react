// @flow

import {getCellNeighbours} from 'helpers/utils';
import type {FieldType, CellType} from 'flux/types';

const createCell = (isBomb: boolean, id: number): CellType =>
    ({
        isOpened: false,
        isBomb,
        isDead: false,
        id,
        aroundBombCount: 0,
        isFlag: false,
        isUnknown: false,
    });

export const fieldGeneratorEmpty = (width: number, height: number): FieldType => {
    const result = [];
    const end = height * width;

    for (let i = 0; i < end; i++) {
        result.push(createCell(false, i));
    }

    return result;
};

export default (width: number, height: number, bombs: number, safeId: number): FieldType => {
    const result = [];
    const end = height * width;
    let totalCells = end;
    let totalBombs = bombs;

    for (let i = 0; i < end; i++) {
        const id = i;
        const isBomb = id !== safeId && totalBombs > 0 && Math.round(Math.random() * totalCells) < totalBombs;

        totalCells--;

        if (isBomb) {
            totalBombs--;
        }

        result.push(createCell(isBomb, id));
    }

    for (let i = 0; i < end; i++) {
        let aroundBombCount = 0;
        const neighbours = getCellNeighbours(i, width, end);

        for (const item of neighbours) {
            const cell = result[item];

            if (cell.isBomb) {
                aroundBombCount++;
            }
        }

        result[i].aroundBombCount = aroundBombCount;
    }

    return result;
};
