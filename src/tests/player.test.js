import Player from '../modules/player';
import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Player class', () => {
  let p1;
  beforeEach(() => {
    p1 = new Player([1, 2], true);
  });

  test('create new player', () => {
    expect(p1.getGameboard() && p1.isMyTurn()).toBeTruthy();
  });
  test('toggle turn', () => {
    expect(p1.toggleMyTurn()).toBeFalsy();
    expect(p1.toggleMyTurn()).toBeTruthy();
  });

  test('player should be able to shoot', () => {
    const board = new Gameboard();
    board.setBoard();
    const ship = new Ship([
      [1, 2],
      [1, 3],
    ]);
    board.placeShip(ship);
    expect(p1.shoot([1, 2], board)).toBeTruthy();
    expect(p1.shoot([1, 4], board)).toBeFalsy();
    expect(() => p1.shoot([1, 2], board)).toThrowError();
  });
});
