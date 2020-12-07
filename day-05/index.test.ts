import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { calculateSeatId, findColumn, findRow, validateInput } from "./lib.ts";

const exampleInput = "FBFBBFFRLR";
const otherExamples = [
  { input: "BFFFBBFRRR", row: 70, column: 7, seatId: 567 },
  { input: "FFFBBBFRRR", row: 14, column: 7, seatId: 119 },
  { input: "BBFFBBFRLL", row: 102, column: 4, seatId: 820 },
];

Deno.test({
  name: "validate input",
  fn: () => {
    assert(validateInput(exampleInput));
    const badInput = "BBBBBBLLLL";
    assert(!validateInput(badInput));
    assertThrows(() => {
      calculateSeatId(badInput);
    });
  },
});

Deno.test({
  name: "row finding",
  fn: () => {
    assertEquals(findRow(exampleInput), 44);
  },
});

Deno.test({
  name: "column finding",
  fn: () => {
    assertEquals(findColumn(exampleInput), 5);
  },
});

Deno.test({
  name: "part one",
  fn: () => {
    assertEquals(calculateSeatId(exampleInput), 357);
    assert(
      otherExamples.every(({ input, row, column, seatId }) => {
        return (
          validateInput(input) &&
          row === findRow(input) &&
          column === findColumn(input) &&
          seatId === calculateSeatId(input)
        );
      }),
    );
    assertEquals(calculateSeatId("BBBBBBBRRR"), 1023);
  },
});
