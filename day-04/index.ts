import { extractPassportData, isNorthPoleCredentials, isValidNorthPoleCredentials } from './lib.ts';

const input = await Deno.readTextFile('./input.txt');

console.log(`Part 1: ${extractPassportData(input).filter(isNorthPoleCredentials).length}`);
console.log(
  `Part 2: ${extractPassportData(input).filter(isNorthPoleCredentials).filter(isValidNorthPoleCredentials).length}`
);
