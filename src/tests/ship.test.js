import Ship from '../modules/ship.js';

describe('Ship class', () => {
  const ship = new Ship();

  test('should contain hit method', () => {
    expect(ship.hit).toBeTruthy();
  });
});
