import Game from '../modules/game';
import Player from '../modules/player';
import Ai from '../modules/ai';
import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Game class', () => {
  let game, player1, player2, ship;
  beforeAll(() => {
    player1 = new Player(new Gameboard());
    player2 = new Ai(new Gameboard());
    ship = new Ship([
      [1, 2],
      [1, 3],
      [1, 4],
    ]);

    player1.getGameboard().placeShip(ship);
    player2.getGameboard().placeShip(ship);
    game = new Game(player1, player2);
  });

  test('play game', () => {});
});
