import {create, isLost, moveForward, rotate} from "../rover.mjs";

describe("create", () => {
  it("returns an object with grid, coordinates, and direction", function () {
    expect(create({ x: 4, y: 8 }, "N", { x: 2, y: 5 })).toEqual(
      jasmine.objectContaining({
        coords: {
          x: 2,
          y: 5,
        },
        grid: {
          x: 4,
          y: 8,
        },
        direction: "N",
      })
    );
  });
});

describe('isLost', () => {
  it('returns false if the rover is within the grid', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 5 });
    expect(isLost(rover)).toBeFalse();
  })

  it('returns false if the rover is at the minimum bounds of the grid', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: 0, y: 0 });
    expect(isLost(rover)).toBeFalse();
  })

  it('returns false if the rover is at the maximum bounds of the grid', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: 4, y: 8 });
    expect(isLost(rover)).toBeFalse();
  })

  it('returns true if the rover is beyond with the maximum bounds', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 9 });
    expect(isLost(rover)).toBeTrue();
  })

  it('returns true if the rover is beyond with the minimum bounds', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: -1, y: 0 });
    expect(isLost(rover)).toBeTrue();
  })
})

describe('moveForward', () => {
  it('returns a state, error, and rover', () => {
    const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
    const result = moveForward(rover);

    expect(result).toEqual(jasmine.objectContaining({
      rover: jasmine.any(Object),
      state: jasmine.any(String),
      error: jasmine.any(Boolean),
    }));
  });

  describe('on a successful move', () => {
    it('has a state of "OK"', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
      const result = moveForward(rover);

      expect(result.state).toEqual("OK");
    });

    it('has an error state of false', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
      const result = moveForward(rover);

      expect(result.error).toBeFalse();
    });

    it('updates the coordinates one square in current direction', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
      const result = moveForward(rover);

      expect(result.rover).toEqual(
        jasmine.objectContaining({
          coords: {
            x: 2,
            y: 5,
          },
        })
      );

      const westRover = create({ x: 4, y: 8 }, "W", { x: 2, y: 4 });
      const westResult = moveForward(westRover);

      expect(westResult.rover).toEqual(
        jasmine.objectContaining({
          coords: {
            x: 1,
            y: 4,
          },
        })
      );
    });
  })

  describe('on an invalid move', () => {
    it('has a state of "LOST"', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 8 });
      const result = moveForward(rover);

      expect(result.state).toEqual("LOST");
    });

    it('has an error state of true', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 8 });
      const result = moveForward(rover);

      expect(result.error).toBeTrue();
    });

    it('returns the last known good coordinates', () => {
      const coordinates = { x: 2, y: 8 };
      const rover = create({ x: 4, y: 8 }, "N", coordinates);
      const result = moveForward(rover);

      expect(result.rover.coords).toEqual(coordinates)
    })
  })
})

describe('rotate', () => {
  describe('when the direction is Left', () => {
    it('rotates the rover from North to West', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
      const result = rotate(rover, 'L');
      expect(result.rover.direction).toBe('W');
    })

    it('rotates the rover from West to South', () => {
      const rover = create({ x: 4, y: 8 }, "W", { x: 2, y: 4 });
      const result = rotate(rover, 'L');
      expect(result.rover.direction).toBe('S');
    })
  })

  describe('when the direction is Right', () => {
    it('rotates the rover from West to North', () => {
      const rover = create({ x: 4, y: 8 }, "W", { x: 2, y: 4 });
      const result = rotate(rover, 'R');
      expect(result.rover.direction).toBe('N');
    })

    it('rotates the rover from North to East', () => {
      const rover = create({ x: 4, y: 8 }, "N", { x: 2, y: 4 });
      const result = rotate(rover, 'R');
      expect(result.rover.direction).toBe('E');
    })
  })
})
