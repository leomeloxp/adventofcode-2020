import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { countInnerBags, findOuterBagCombinations, parseRules } from "./lib.ts";

const myBag = `shiny gold`;
const exampleInput =
  `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const exampleInput2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

Deno.test({
  name: "rule assemble",
  fn: () => {
    assertEquals(
      parseRules(exampleInput).size,
      9,
    );
  },
});

Deno.test({
  name: "part one",
  fn: () => {
    assertEquals(
      findOuterBagCombinations(
        exampleInput,
        myBag,
      ),
      4,
    );
  },
});

Deno.test({
  name: "part two",
  fn: () => {
    assertEquals(
      countInnerBags(
        exampleInput,
        myBag,
      ),
      32,
    );

    assertEquals(
      countInnerBags(
        exampleInput2,
        myBag,
      ),
      126,
    );
  },
});
