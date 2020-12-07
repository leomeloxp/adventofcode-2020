import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { findThreeAndMultiply, findTwoAndMultiply } from "./lib.ts";

const exampleInput = [1721, 979, 366, 299, 675, 1456];
const partOneResult = 514579;
const partTwoResult = 241861950;

Deno.test({
  fn: () => {
    assertEquals(findTwoAndMultiply(exampleInput), partOneResult);
    assertNotEquals(
      findTwoAndMultiply(exampleInput.map((x) => x + 1)),
      partOneResult,
    );
  },
  name: "part one",
});

Deno.test({
  fn: () => {
    assertEquals(findThreeAndMultiply(exampleInput), partTwoResult);
  },
  name: "part two",
});
