// @flow

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

    for (let i = 0; i < height; i++) {
        result.push([]);

        for (let j = 0; j < width; j++) {
            result[i].push(createCell(false, (i * width) + j));
        }
    }

    return result;
};

export default (width: number, height: number, bombs: number, safeId: number): FieldType => {
    const result = [];
    let totalCells = width * height;
    let totalBombs = bombs;

    for (let i = 0; i < height; i++) {
        result.push([]);

        for (let j = 0; j < width; j++) {
            const id = (i * width) + j;
            const isBomb = id !== safeId && totalBombs > 0 && Math.round(Math.random() * totalCells) < totalBombs;

            totalCells--;

            if (isBomb) {
                totalBombs--;
            }

            result[i].push(createCell(isBomb, id));
        }
    }

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let aroundBombCount = 0;

            [
                [i, j - 1],
                [i, j + 1],
                [i + 1, j],
                [i + 1, j - 1],
                [i + 1, j + 1],
                [i - 1, j],
                [i - 1, j - 1],
                [i - 1, j + 1],
            ].forEach((item) => {
                if (item[0] < 0 || item[0] >= height || item[1] < 0 || item[1] >= width) {
                    return;
                }

                const cell = result[item[0]][item[1]];

                if (cell.isBomb) {
                    aroundBombCount++;
                }
            });

            result[i][j].aroundBombCount = aroundBombCount;
        }
    }

    return result;
};
