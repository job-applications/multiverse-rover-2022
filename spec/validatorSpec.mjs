import { validatePositiveInteger, validateInput, parseRoverInput } from "../validator.mjs";
import * as Error from "../errors.mjs";

describe('validatePositiveInteger', function() {
  it('returns an integer when the input string is an integer', () => {
    expect(validatePositiveInteger('42')).toBe(42);
  });

  it('allows the values zero and above', () => {
    expect(validatePositiveInteger('0')).toBe(0);
  });

  it('strips leading zeros when parsing', () => {
    expect(validatePositiveInteger('0001')).toBe(1);
  });

  it('throws an error with negative numbers', () => {
    const fn = () => validatePositiveInteger('-1');
    expect(fn).toThrowError(Error.PositiveIntegerError);
  });

  it('throws an error with floats', () => {
    const fn = () => validatePositiveInteger('0.43');
    expect(fn).toThrowError(Error.PositiveIntegerError);
  });
});

describe('parseRoverInput', () => {
  it('returns an object of rover and commands', () => {
    const input = '(2, 3, E) LFRFF';
    expect(parseRoverInput(input)).toEqual(
      jasmine.objectContaining({
        state: {
          direction: 'E',
          coords: { x: 2, y: 3 }
        },
        commands: 'LFRFF',
      })
    );
  });

  it('throws an error when the rover direction is invalid', () => {
    const input = '(2, 3, Q) LFRFF';
    const fn = () => parseRoverInput(input)
    expect(fn).toThrowError(Error.RoverDirectionError);
  });

  it('throws an error when the rover position is invalid', () => {
    const input = '(-1, 3, S) LFRFF';
    const fn = () => parseRoverInput(input)
    expect(fn).toThrowError(Error.RoverPositionError);
  });
});


describe('validateInput', () => {
  it('returns an object of rover and commands', () => {
    const input = ['4 8', '(2, 3, E) LFRFF', '(0, 2, N) FFLFRFF'];
    expect(validateInput(input)).toEqual(
      jasmine.objectContaining({
        grid: { x: 4, y: 8 },
        rovers: [
          {
            state: {
              direction: 'E',
              coords: { x: 2, y: 3 }
            },
            commands: 'LFRFF',
          },
          {
            state: {
              direction: 'N',
              coords: { x: 0, y: 2 }
            },
            commands: 'FFLFRFF',
          }
        ],
      })
    );
  });
});
