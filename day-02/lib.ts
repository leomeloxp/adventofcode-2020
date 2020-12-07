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

export const isValidSledRentalPassword = (passwordInput: string): boolean => {
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

export const isValidTobogganRentalPassword = (
  passwordInput: string,
): boolean => {
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
