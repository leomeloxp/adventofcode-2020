import {
  extractBootCodeAccumulatorAfterFix,
  extractBootCodeAccumulatorBeforeCrash,
} from "./lib.ts";

const input = await Deno.readTextFile("./input.txt");

console.log(`Part 1: ${
  extractBootCodeAccumulatorBeforeCrash(
    (input),
  )[0]
}`);

console.log(`Part 2: ${extractBootCodeAccumulatorAfterFix(input)}`);
