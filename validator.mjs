import { directions } from "./constants.mjs";
import * as Error from "./errors.mjs";

export function validatePositiveInteger(input) {
  if(!input) {
    throw new Error.PositiveIntegerError('Expected positive integer was empty')
  }

  if (!input.match(/^[0-9]+$/)) {
    throw new Error.PositiveIntegerError(`Invalid expected positive integer: '${input}'`);
  }

  return parseInt(input, 10);
}

export function validateRoverDirection(input) {
  if (directions.includes(input)) {
    return input;
  }

  throw new Error.RoverDirectionError(`Direction is invalid: '${input}'`);
}

export function validateInput(input) {
  if (!Array.isArray(input) || input.length < 2) {
    throw new Error.InputError('Please include a grid and rover instructions')
  }

  const grid = validateGrid(input[0]);
  const rovers = input.slice(1).map(parseRoverInput);

  return {
    grid,
    rovers
  }
}

export function validateGrid(input) {
  const [x, y] = input.split(/\s+/);

  return {
    x: validatePositiveInteger(x),
    y: validatePositiveInteger(y),
  }
}

export function parseRoverInput(input) {
  const state = input.substring(input.indexOf("(") + 1, input.lastIndexOf(")"))

  const commands = input
    .substring(input.lastIndexOf(")") + 1)
    .replace(/\s+/g, "");

  return {
    state: validateRoverState(state),
    commands: validateRoverCommands(commands),
  };
}

function validateRoverState(input) {
  const [x, y, direction] = input.replace(/\s+/g, "").split(/,/);

  try {
    return {
      direction: validateRoverDirection(direction),
      coords: validateGrid(`${x} ${y}`)
    };
  } catch (error) {
    if (error instanceof Error.PositiveIntegerError) {
      throw new Error.RoverPositionError();
    }
    throw error;
  }
}

function validateRoverCommands(input) {
  if (input.match(/^[FLR]+$/)) {
    return input;
  }

  throw new Error.RoverCommandError(`Commands entered are invalid: '${input}'`);
}
