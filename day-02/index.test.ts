import { assert } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { isValidSledRentalPassword, isValidTobogganRentalPassword } from './lib.ts';
const exampleInput = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
const partOneResult = [true, false, true];
const partTwoResult = [true, false, false];

Deno.test({
  name: 'part one',
  fn: () => {
    assert(
      exampleInput.every((entry, index) => {
        return isValidSledRentalPassword(entry) === partOneResult[index];
      })
    );
  }
});

Deno.test({
  name: 'part two',
  fn: () => {
    assert(
      exampleInput.every((entry, index) => {
        return isValidTobogganRentalPassword(entry) === partTwoResult[index];
      })
    );
  }
});
