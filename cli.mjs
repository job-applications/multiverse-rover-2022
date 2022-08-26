import * as readline from "readline";
import * as RoverLib from "./rover.mjs"
import { validateInput } from "./validator.mjs";

export function processInput(userInput) {
  const parsedInput = validateInput(userInput);
  const retval = [];

  parsedInput.rovers.forEach(({ state, commands }) => {
    const rover = RoverLib.create(
      parsedInput.grid,
      state.direction,
      state.coords
    );

    const result = RoverLib.executeInstructions(rover, commands);
    retval.push(RoverLib.getPrintableResultStatus(result));
  });

  return retval;
}

export async function readUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = [];
  for await (const line of rl) {
    const trim = line.trim();
    if (!trim) {
      break;
    }

    input.push(trim);
  }

  return input;
}
