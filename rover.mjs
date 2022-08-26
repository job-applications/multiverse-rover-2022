import { directions } from "./constants.mjs"

export const instructions = {
  N: {
    axis: "y",
    modifier: 1,
  },
  S: {
    axis: "y",
    modifier: -1,
  },
  E: {
    axis: "x",
    modifier: 1,
  },
  W: {
    axis: "x",
    modifier: -1,
  },
};

export const create = (grid, direction, coords) => ({
  grid,
  direction,
  coords,
});

export const isLost = (rover) => {
  const coords = getCoords(rover);
  const grid = getGrid(rover);
  return coords.x > grid.x || coords.y > grid.y || coords.x < 0 || coords.y < 0;
};

export const getCoords = (rover) => rover.coords;

export const getGrid = (rover) => rover.grid;

export const executeInstruction = (rover, instruction) => {
  if (instruction === "F") {
    return moveForward(rover);
  }
  return rotate(rover, instruction);
};

export const executeInstructions = (rover, instructions) => {
  let result = { rover, error: false };

  for (const instruction of instructions) {
    result = executeInstruction(result.rover, instruction);

    if (result.error) {
      break;
    }
  }

  return result;
};

export const moveForward = (rover) => {
  const instruction = instructions[rover.direction];
  const coords = getCoords(rover);
  const newRover = create(rover.grid, rover.direction, {
    ...coords,
    [instruction.axis]: coords[instruction.axis] + instruction.modifier,
  });

  if (isLost(newRover)) {
    return {
      error: true,
      state: "LOST",
      rover,
    };
  }
  return {
    error: false,
    state: "OK",
    rover: newRover,
  };
};

export const rotate = (rover, instruction) => {
  const modifier = instruction === "R" ? 1 : -1;
  const offset = directions.indexOf(rover.direction) + 4 + modifier;
  const newDirection = [...directions, ...directions, ...directions][offset];

  return {
    rover: create(getGrid(rover), newDirection, getCoords(rover)),
    error: false,
  };
};

export const getPrintableResultStatus = (result) => {
  const { rover, error, state } = result;
  const coords = getCoords(rover);

  const printable = [];
  printable.push(`(${coords.x}, ${coords.y}, ${rover.direction})`);

  if (error) {
    printable.push(state);
  }

  return printable.join(' ');
}
