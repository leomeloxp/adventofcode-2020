const input = await Deno.readTextFile("./inputs/day-02.txt");
const parsedInput = input.split("\n");

const regexFilter = new RegExp(
  "^(?<first>\\d+)-(?<second>\\d+)\\ (?<char>[a-zA-Z]{1}): (?<password>.+)",
);
const isLogicalXOR = (a: boolean, b: boolean): boolean => {
  return (a && !b) || (!a && b);
};

const getMatchedGroups = (
  input: string,
): {
  first: number;
  second: number;
  char: string;
  password: string;
} | void => {
  const matched = regexFilter.exec(input);

  if (matched?.groups) {
    const { first, second, char, password }: Record<string, string> =
      matched.groups;
    return {
      first: parseInt(first, 10),
      second: parseInt(second, 10),
      char,
      password,
    };
  }
};

const isValidSledRentalPassword = (passwordInput: string): boolean => {
  const groups = getMatchedGroups(passwordInput);

  if (groups) {
    const { first, second, char, password } = groups;

    const characterCount = password.split("").filter((passwordChar) =>
      passwordChar === char
    ).length;

    return characterCount >= first && characterCount <= second;
  }

  return false;
};

const isValidTobogganRentalPassword = (passwordInput: string): boolean => {
  const groups = getMatchedGroups(passwordInput);

  if (groups) {
    const { first, second, char, password } = groups;

    return isLogicalXOR(
      password[first - 1] === char,
      password[second - 1] === char,
    );
  }
  return false;
};

console.log("Part 1:", parsedInput.filter(isValidSledRentalPassword).length);
console.log(
  "Part 2:",
  parsedInput.filter(isValidTobogganRentalPassword).length,
);
