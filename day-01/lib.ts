export const findTwoAndMultiply = (input: number[]) => {
  for (const x of input) {
    for (const y of input.slice(0)) {
      if (x + y === 2020) {
        return x * y;
      }
    }
  }
};

export const findThreeAndMultiply = (input: number[]) => {
  for (const x of input) {
    for (const y of input.slice(0)) {
      for (const z of input.slice(1)) {
        if (x + y + z === 2020) {
          return x * y * z;
        }
      }
    }
  }
};
