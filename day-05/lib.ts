export const findRow = (input: string): number => {
  const binary = input
    .substr(0, 7)
    .split('')
    .map(char => (char === 'F' ? '0' : '1'))
    .join('');

  return parseInt(binary, 2);
};

export const findColumn = (input: string): number => {
  const binary = input
    .substr(7)
    .split('')
    .map(char => (char === 'L' ? '0' : '1'))
    .join('');

  return parseInt(binary, 2);
};

export const calculateSeatId = (input: string): number => {
  if (!validateInput(input)) {
    throw new Error('Input is invalid');
  }

  const row = findRow(input);
  const column = findColumn(input);
  return row * 8 + column;
};

export const validateInput = (input: string): boolean => {
  const isRowSectionValid = input
    .substr(0, 7)
    .split('')
    .every(char => ['F', 'B'].includes(char));
  const isColumnSectionValid = input
    .substr(7)
    .split('')
    .every(char => ['L', 'R'].includes(char));
  return input.length === 10 && isRowSectionValid && isColumnSectionValid;
};
