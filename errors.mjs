export class RoverDefinitionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoverDefinitionError';
  }
}

export class RoverDirectionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoverDirectionError';
  }
}

export class RoverStateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoverStateError';
  }
}

export class RoverCommandError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoverCommandError';
  }
}

export class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PositiveIntegerError';
  }
}

export class RoverPositionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RoverPositionError';
  }
}

export class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}
