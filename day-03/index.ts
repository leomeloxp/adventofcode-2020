import { countTrees, moveRightAndDownToEnd, Pointer } from './lib.ts';

const input = await Deno.readTextFile('./input.txt');
const patternOne: Pointer = [3, 1];
const patternTwo: Pointer[] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

console.log('Part 1:', countTrees(moveRightAndDownToEnd(input, patternOne)));
console.log(
  'Part 2:',
  patternTwo.reduce((acc, pattern) => {
    return acc * countTrees(moveRightAndDownToEnd(input, pattern));
  }, 1)
);
