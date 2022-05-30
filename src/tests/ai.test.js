import Ai from '../modules/ai';
import Player from '../modules/player';
import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Ai class', () => {
  let ai;
  beforeEach(() => {
    ai = new Ai([[1, 2]], false);
  });
  test('ai instace of player', () => {
    expect(new Ai([1, 2], false)).toBeInstanceOf(Player);
  });

  test('can shoot only to empty spots', () => {
    const board = new Gameboard();

    const ship = new Ship([
      [3, 2],
      [3, 3],
    ]);
    board.placeShip(ship);

    expect(() => {
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
      ai.shoot(board);
    }).not.toThrowError();
  });
});
