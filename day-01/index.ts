import { findThreeAndMultiply, findTwoAndMultiply } from './lib.ts';

const inputFile = await Deno.readTextFile('input.txt');
const parsedInput = inputFile.split('\n').map((x: string) => parseInt(x, 10));

console.log('Part 1:', findTwoAndMultiply(parsedInput));
console.log('Part 2:', findThreeAndMultiply(parsedInput));
