type RuleMap = Map<string, [string, number][]>;

const innerRuleRegex = new RegExp(/^(?<qty>\d) (?<colour>[a-z]+ [a-z]+)/);

export const parseRules = (input: string): RuleMap => {
  const rulesStr = input.split(".\n");

  const rulesObjects: [string, [string, number][]][] = rulesStr.map(
    (ruleStr) => {
      const [outerBagColour, innerBagsStr] = ruleStr.split(" bags contain ");

      const innerRulesArr: [string, number][] = innerBagsStr.split(", ").map(
        (ruleStr) => {
          const matches = innerRuleRegex.exec(ruleStr)?.groups;

          if (matches && matches.colour) {
            return [matches.colour, parseInt(matches.qty, 10)];
          }

          return ["", 0];
        },
      );
      return [outerBagColour, innerRulesArr];
    },
  );
  return new Map(rulesObjects);
};

type RecursiveFindBagCombinationsArgs = {
  rulesMap: RuleMap;
  current: string;
  targetColour: string;
  depth?: number;
};
export const recursiveCanHoldTargetBag = (
  { rulesMap, current, targetColour, depth = 0 }:
    RecursiveFindBagCombinationsArgs,
): boolean => {
  const inner = rulesMap.get(current);
  if (inner) {
    const outPut = inner.flatMap(([colour, qty]) => {
      if (colour === targetColour) {
        return true;
      }
      if (
        rulesMap.has(colour) &&
        // Optional safeguard against infinite loop
        depth < 10
      ) {
        return recursiveCanHoldTargetBag(
          {
            rulesMap: rulesMap,
            current: colour,
            targetColour: targetColour,
            depth: depth + 1,
          },
        );
      }
      return false;
    }).some(Boolean);
    return outPut;
  }
  return false;
};

export const findOuterBagCombinations = (
  input: string,
  targetColour: string,
) => {
  const rulesMap = parseRules(input);
  const res = Array.from(rulesMap.keys()).map((current) => {
    // Top level of our colour should be false by default;
    if (current === targetColour) {
      return false;
    }
    return recursiveCanHoldTargetBag({ rulesMap, current, targetColour });
  }).filter(Boolean);

  return res.length;
};

type RecursiveCountInnerBagsArgs = {
  rulesMap: RuleMap;
  current: string;
  depth?: number;
};
export const recursiveCountInnerBags = (
  { rulesMap, current, depth = 0 }: RecursiveCountInnerBagsArgs,
): number => {
  const inner = rulesMap.get(current);
  if (inner) {
    const outPut = inner.flatMap(([colour, qty]) => {
      if (
        rulesMap.has(colour)
      ) {
        return (recursiveCountInnerBags(
              { rulesMap: rulesMap, current: colour, depth: depth + 1 },
            )) * qty + qty;
      }
      return qty;
    });
    const sum = outPut.reduce((acc, entry) => {
      return acc + entry;
    }, 0);
    return sum;
  }
  return 1;
};

export const countInnerBags = (input: string, targetColour: string): number => {
  const rulesMap = parseRules(input);
  const inner = rulesMap.get(targetColour);

  if (inner) {
    return inner.reduce((acc, [current, qty]) => {
      const sum = recursiveCountInnerBags({ rulesMap, current });
      const subTotal = qty + (qty * sum);

      return acc + subTotal;
    }, 0);
  }
  return 0;
};
