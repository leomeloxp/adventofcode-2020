import { calculateSeatId } from './lib.ts';

const input = await Deno.readTextFile('./input.txt');

console.log(`Part 1: ${Math.max(...input.split('\n').map(calculateSeatId))}`);

const seats = input.split('\n').map(calculateSeatId).sort();

const beforeMissingSeat =
  seats.find((seat, index, arr) => {
    // We're finding the seat which the next one inline is + 2
    // from them meaning it would have skipped our seat
    return arr[index + 1] === seat + 2;
  }) ?? 0;

console.log(`Part 2: ${beforeMissingSeat + 1}`);
