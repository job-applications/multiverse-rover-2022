# Multiverse Rover

## Requirements
- Node 16.x+

## Getting Started

```bash
npm install
```

## Commands

The solution is available by running `npm start`. This will display instructions and prompt for input. Hit Enter/Return after each line of input. Leave a blank line to finish entering input and see the results.

Tests can be run with `npm test`

## Assumptions

- If initial rover coordinates are positive integers, it's assumed the starting direction is correct
- User input is partially validated (positive integer for coordinates, valid letters for instructions)

## Examples

### Sample 1
The input takes the form:
```
4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF
```

Output:
```
(4, 4, E)
(0, 4, W) LOST
```

### Sample 2
Another example for the input:
```
4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF
```

The output would be:
```
(2, 3, W)
(1, 0, S) LOST
```
