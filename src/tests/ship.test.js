import Ship from '../modules/ship';

describe('Ship class', () => {
  const ship = new Ship([
    [1, 2],
    [1, 3],
  ]);

  test('should contain hit and isSunk public methods', () => {
    expect(ship.hit).toBeTruthy();
    expect(ship.isSunk).toBeTruthy();
  });

  test('setPosition should return multidimensional array', () => {
    expect(ship.getPosition()).toEqual([
      [1, 2, false],
      [1, 3, false],
    ]);
  });

  test('after hit change position coordinate to true', () => {
    expect(ship.hit([1, 3])).toBe(true);
    expect(ship.getPosition()).toEqual([
      [1, 2, false],
      [1, 3, true],
    ]);
  });

  test('if every position is hit sink ship and return true', () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit([1, 2]);
    expect(ship.isSunk()).toBe(true);
  });
});
