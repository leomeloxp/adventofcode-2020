import {
  findGroupCommonAnswers,
  findGroupUniqueAnswers,
  splitGroups,
} from "./lib.ts";

const input = await Deno.readTextFile("./input.txt");

console.log(
  `Part 1: ${
    splitGroups(input).map((group) => findGroupUniqueAnswers(group)).reduce(
      (acc, answerSet) => acc + answerSet.size,
      0,
    )
  }`,
);
console.log(
  `Part 1: ${
    splitGroups(input).map((group) => findGroupCommonAnswers(group)).reduce(
      (acc, answerSet) => acc + answerSet.size,
      0,
    )
  }`,
);
