import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  assertIsValidMatrix,
  countTrees,
  moveRightAndDownToEnd,
  Pointer,
} from "./lib.ts";

const exampleInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

const partOneResult = 7;
const partTwoResult = 336;
const patternOne: Pointer = [3, 1];
const patternTwo: Pointer[] = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

Deno.test({
  name: "matrix assertion",
  fn: () => {
    assertThrows(() => assertIsValidMatrix([[".", ".", "x"]]));
  },
});

Deno.test({
  name: "part one",
  fn: () => {
    assertEquals(
      countTrees(moveRightAndDownToEnd(exampleInput, patternOne)),
      partOneResult,
    );
  },
});

Deno.test({
  name: "part two",
  fn: () => {
    assertEquals(
      patternTwo.reduce((acc, pattern) => {
        return acc * countTrees(moveRightAndDownToEnd(exampleInput, pattern));
      }, 1),
      partTwoResult,
    );
  },
});
