import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {
  findGroupCommonAnswers,
  findGroupUniqueAnswers,
  splitGroups,
} from "./lib.ts";

const exampleInput1 = `abcx
abcy
abcz`;

const exampleInput2 = `abc

a
b
c

ab
ac

a
a
a
a

b`;

Deno.test({
  name: "splitGroups",
  fn: () => {
    assertEquals(splitGroups(exampleInput1).length, 1);
    assertEquals(splitGroups(exampleInput2).length, 5);

    assertEquals(splitGroups(exampleInput1).map((group) => group.length), [3]);
    assertEquals(
      splitGroups(exampleInput2).map((group) => group.length),
      [1, 3, 2, 4, 1],
    );
  },
});

Deno.test({
  name: "part one",
  fn: () => {
    assertEquals(splitGroups(exampleInput1).length, 1);
    assertEquals(splitGroups(exampleInput2).length, 5);

    assertEquals(
      splitGroups(exampleInput1).map((group) =>
        findGroupUniqueAnswers(group).size
      ),
      [6],
    );
    assertEquals(
      splitGroups(exampleInput2).map((group) =>
        findGroupUniqueAnswers(group).size
      ),
      [3, 3, 3, 1, 1],
    );
  },
});

Deno.test({
  name: "part two",
  fn: () => {
    assertEquals(splitGroups(exampleInput1).length, 1);
    assertEquals(splitGroups(exampleInput2).length, 5);

    assertEquals(
      splitGroups(exampleInput1).map((group) =>
        findGroupCommonAnswers(group).size
      ),
      [3],
    );
    assertEquals(
      splitGroups(exampleInput2).map((group) =>
        findGroupCommonAnswers(group).size
      ),
      [3, 0, 1, 1, 1],
    );
  },
});
