export const getCellNeighbours = (id: number, rowWidth: number, size: number): number[] => {
  const isFirstInRow = id % rowWidth === 0;
  const isLastInRow = id % rowWidth === rowWidth - 1;
  const neighbours: number[] = [];

  if (id + rowWidth < size) {
    neighbours.push(
      id + rowWidth // bottom
    );
  }

  if (id - rowWidth >= 0) {
    neighbours.push(
      id - rowWidth // top
    );
  }

  if (!isFirstInRow) {
    neighbours.push(
      id - 1, // left
      id + rowWidth - 1, // bottom-left
      id - rowWidth - 1, // top-left
    );
  }

  if (!isLastInRow) {
    neighbours.push(
      id + 1, // right
      id + rowWidth + 1, // bottom-right
      id - rowWidth + 1, // top-right
    );
  }

  return neighbours.filter((i) => i >= 0 && i < size);
};

export const IS_OPENED_BIT_FLAG = 1;
export const IS_BOMB_BIT_FLAG = 2;
export const IS_FLAG_BIT_FLAG = 4;
export const IS_UNKNOWN_BIT_FLAG = 8;

export const IS_EVERYTHING_BIT_FLAG = (2 ** 8) - 1;
