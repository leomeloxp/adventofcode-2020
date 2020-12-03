import { isValidSledRentalPassword, isValidTobogganRentalPassword } from './lib.ts';

const input = await Deno.readTextFile('./input.txt');
const parsedInput = input.split('\n');

console.log('Part 1:', parsedInput.filter(isValidSledRentalPassword).length);
console.log('Part 2:', parsedInput.filter(isValidTobogganRentalPassword).length);
