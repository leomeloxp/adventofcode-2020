import { countInnerBags, findOuterBagCombinations, parseRules } from "./lib.ts";

const input = await Deno.readTextFile("./input.txt");
const myBag = `shiny gold`;

console.log(`Part 1: ${
  findOuterBagCombinations(
    (input),
    myBag,
  )
}`);
console.log(`Part 2: ${
  countInnerBags(
    (input),
    myBag,
  )
}`);
