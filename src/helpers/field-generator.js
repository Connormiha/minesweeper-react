// @flow

import type {CellType} from 'flux/types';

export default (width: number, height: number, bombs: number): CellType[][] => {
    const result = [];
    let totalCells = width * height;
    let totalBombs = bombs;

    for (let i = 0; i < width; i++) {
        result.push([]);

        for (let j = 0; j < height; j++) {
            const isBomb = totalBombs > 0 && Math.round(Math.random() * totalCells) < totalBombs;

            totalCells--;

            if (isBomb) {
                totalBombs--;
            }

            result[i].push({
                isOpened: false,
                isBomb,
                isDead: false,
                isMarked: false,
                id: (i * height) + j,
            });
        }
    }

    return result;
};
