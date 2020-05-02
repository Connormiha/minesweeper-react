import {getCellNeighbours, IS_BOMB_BIT_FLAG} from 'helpers/utils';
import type {FieldType} from 'flux/types';

export const fieldGeneratorEmpty = (width: number, height: number): FieldType =>
  new Uint8Array(height * width);

export default (width: number, height: number, bombs: number, safeId: number): FieldType => {
  const end = height * width;
  const result = new Uint8Array(end);
  let totalCells = end;
  let totalBombs = bombs;

  for (let i = 0; i < end; i++) {
    const id = i;
    const isBomb = id !== safeId && totalBombs > 0 && Math.round(Math.random() * totalCells) < totalBombs;

    totalCells--;

    if (isBomb) {
      totalBombs--;
    }

    result[i] = (isBomb ? IS_BOMB_BIT_FLAG : 0);
  }

  for (let i = 0; i < end; i++) {
    let aroundBombCount = 0;
    const neighbours = getCellNeighbours(i, width, end);

    for (const item of neighbours) {
      const cell = result[item];

      if (cell & IS_BOMB_BIT_FLAG) {
        aroundBombCount++;
      }
    }

    result[i] |= (aroundBombCount << 4);
  }

  return result;
};
