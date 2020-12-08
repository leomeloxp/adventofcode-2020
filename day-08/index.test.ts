import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  extractBootCodeAccumulatorAfterFix,
  extractBootCodeAccumulatorBeforeCrash,
  parseBootCode,
} from "./lib.ts";

const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

Deno.test({
  name: "parse boot code",
  fn: () => {
    assert(parseBootCode(testInput));
    assertThrows(() => {
      parseBootCode("lol +42");
    });
  },
});

Deno.test({
  name: "part one",
  fn: () => {
    assertEquals(extractBootCodeAccumulatorBeforeCrash(testInput)[0], 5);
  },
});

Deno.test({
  name: "part two",
  fn: () => {
    assertEquals(extractBootCodeAccumulatorAfterFix(testInput), 8);
  },
});
