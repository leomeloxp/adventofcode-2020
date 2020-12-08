type Instruction = {
  cmd: "acc" | "jmp" | "nop";
  val: number;
  sign?: "-" | "+";
};

const isValidCmd = (arg: string): arg is Instruction["cmd"] => {
  return ["acc", "jmp", "nop"].includes(arg);
};

export const parseBootCode = (input: string): Instruction[] => {
  const instructions = input.split("\n").map((line) => {
    const [cmd, valueStr] = line.split(" ");
    if (!isValidCmd(cmd)) {
      throw new Error("not a valid command");
    }
    const val = parseInt(valueStr);
    return {
      cmd,
      val,
    };
  });

  return instructions;
};

export const extractBootCodeAccumulatorBeforeCrash = (
  input: string,
): [number, number] => {
  const instructions: Instruction[] = parseBootCode(input);
  const executedInstructionIndices: number[] = [];
  let accumulator = 0;
  let currentIndex = 0;

  while (
    !executedInstructionIndices.includes(currentIndex) && (
      executedInstructionIndices.length < instructions.length
    )
  ) {
    executedInstructionIndices.push(currentIndex);

    const { acc, next } = executeInstructionAndReturn({
      instruction: instructions[currentIndex],
      acc: accumulator,
      index: currentIndex,
    });
    accumulator = acc;
    currentIndex = next;
  }
  return [accumulator, currentIndex];
};

type ExecuteInstructionAndReturnArgs = {
  instruction: Instruction;
  acc: number;
  index: number;
};
const executeInstructionAndReturn = (
  { instruction: instructions, acc, index }: ExecuteInstructionAndReturnArgs,
): { acc: number; next: number } => {
  const { cmd, val } = instructions;
  if (cmd === "nop") {
    return {
      acc,
      next: index + 1,
    };
  }

  if (cmd === "acc") {
    return {
      acc: acc + val,
      next: index + 1,
    };
  }

  return {
    acc,
    next: index + val,
  };
};

export const extractBootCodeAccumulatorAfterFix = (input: string): number => {
  const originalInstructions = parseBootCode(input);
  let instructions = [...originalInstructions];
  let executedInstructionIndices: number[] = [];
  let accumulator = 0;
  let currentIndex = 0;
  let fixedUpToIndex = 0;

  while (currentIndex < originalInstructions.length) {
    executedInstructionIndices.push(currentIndex);

    const instruction = instructions[currentIndex];
    const { acc, next } = executeInstructionAndReturn({
      instruction,
      acc: accumulator,
      index: currentIndex,
    });
    accumulator = acc;
    currentIndex = next;

    if (executedInstructionIndices.includes(currentIndex)) {
      const [newInstructions, index] = fixOneInstruction(
        originalInstructions,
        fixedUpToIndex,
      );
      // Reset all values before essentially restarting the while loop with new instructions
      accumulator = 0;
      currentIndex = 0;
      executedInstructionIndices = [];
      instructions = newInstructions;
      fixedUpToIndex = index;
    }
  }

  return accumulator;
};

const fixOneInstruction = (
  instructions: Instruction[],
  fromIndex: number,
): [newInstructions: Instruction[], fixedIndex: number] => {
  const newInstructions = [...instructions];

  for (const [index, instruction] of newInstructions.entries()) {
    if (index >= fromIndex && ["nop", "jmp"].includes(instruction.cmd)) {
      const cmdSwap: Record<Instruction["cmd"], Instruction["cmd"]> = {
        jmp: "nop",
        nop: "jmp",
        acc: "acc",
      };
      const { val } = newInstructions[index];
      const cmd = cmdSwap[newInstructions[index].cmd];
      const fixedIndex = index + 1;
      if (cmd === "jmp" && val === 0) {
        return [newInstructions, fixedIndex];
      }
      newInstructions[index] = {
        cmd,
        val,
      };
      return [newInstructions, fixedIndex];
    }
  }
  throw new Error("cannot fix code");
};
