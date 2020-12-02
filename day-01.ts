const input = await Deno.readTextFile('./inputs/day-01.txt');
const parsedInput = input.split('\n').map((x: string) => parseInt(x, 10));

const findTwoAndMultiply = () => {
  for (const x of parsedInput) {
    for (const y of parsedInput.slice(0)) {
      if (x + y === 2020) {
        return x * y;
      }
    }
  }
};

const findThreeAndMultiply = () => {
  for (const x of parsedInput) {
    for (const y of parsedInput.slice(0)) {
      for (const z of parsedInput.slice(1)) {
        if (x + y + z === 2020) {
          return x * y * z;
        }
      }
    }
  }
};

console.log('Part 1:', findTwoAndMultiply());
console.log('Part 2:', findThreeAndMultiply());
