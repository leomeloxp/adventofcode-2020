export type Point = '.' | '#';
export type Matrix = Point[][];
export type Pointer = [x: number, y: number];

export const assertIsValidMatrix: (input: string[][]) => asserts input is Matrix = (
  input: string[][]
): asserts input is Matrix => {
  if (!input.every(row => row.every(point => ['.', '#'].includes(point)))) {
    throw new Error('Input is not a valid Matrix');
  }
};

export const countTrees = (route: string[]): number => {
  return route.filter(point => point === '#').length;
};

export const moveRightAndDownToEnd = (input: string, pattern: Pointer): string[] => {
  const matrix = input.split('\n').map(row => row.split(''));
  const points: Point[] = [];
  let pointer: Pointer = [0, 0];

  assertIsValidMatrix(matrix);

  while (pointer[1] < matrix.length - 1) {
    const [newPointer, point] = moveRightAndDownOnce(matrix, pointer, pattern);
    pointer = newPointer;
    points.push(point);
  }

  return points;
};

const moveRightAndDownOnce = (matrix: Matrix, [x, y]: Pointer, pattern: Pointer): [Pointer, Point] => {
  const [newX, newY] = [x + pattern[0], y + pattern[1]];
  const isWithinBounds = matrix[newY].length > newX;
  const xCoord = isWithinBounds ? newX : newX % matrix[newY].length;
  const pointFound = matrix[newY][xCoord];

  return [[xCoord, newY], pointFound];
};
