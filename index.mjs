import { echo } from "zx";
import { processInput, readUserInput } from "./cli.mjs";

echo`${chalk.green(`Welcome to the Mars Reover Project`)}

The input takes the form:
${chalk.yellow(`4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`)}

The first line of the input ‘4 8’ specifies the size of the grid. The subsequent lines each
represent the initial state and commands for a single robot. (0, 2, N) specifies the initial state
of the form (x, y, orientation). FFLFRFF represents the sequence of movement commands
for the robot.

Each robot has a position (x, y), and an orientation (N, E, S, W). Each robot can move forward
one space (F), rotate left by 90 degrees (L), or rotate right by 90 degrees (R). If a robot moves
off the grid, it is marked as 'lost' and its last valid grid position and orientation is recorded.

Enter a blank line to execute your instructions.
`;
echo(chalk.yellow(`Begin Input:`));

const userInput = await readUserInput();

try {
  echo(processInput(userInput).join('\n'));
} catch (error) {
  echo(chalk.red(`Error [${error.name}]: ${error.message}`));
}
