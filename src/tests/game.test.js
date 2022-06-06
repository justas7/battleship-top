import Game from '../modules/game';
import Player from '../modules/player';
import Ai from '../modules/ai';
import Gameboard from '../modules/gameboard';
import DragDropRotate from '../modules/dragDropRotate';

describe('Game class', () => {
  let game, player1, player2, ddr, boardEl;
  beforeAll(() => {
    player1 = new Player(new Gameboard());
    player2 = new Ai(new Gameboard());

    game = new Game(player1, player2);
  });

  test('fill each players board with ships in random positions', () => {
    game.initStartingBoards();

    expect(player1.getGameboard().getShips().length).toBe(5);
    expect(player2.getGameboard().getShips().length).toBe(5);
  });
});
