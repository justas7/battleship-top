import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Gameboard class', () => {
  let board;
  beforeEach(() => {
    board = new Gameboard();
    board.setBoard();
  });

  test('create 10x10 board as multidimensional array', () => {
    expect(board.getBoard().length).toBe(10);
  });
  test('create 10x10 board as multidimensional array', () => {
    expect(board.getBoard().flat().length).toBe(100);
  });

  test('place ship on board', () => {
    const ship1 = new Ship([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ]);

    const ship2 = new Ship([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);

    const ship3 = new Ship([
      [9, 1],
      [9, 2],
    ]);

    const coords1 = ship1.getPosition();
    const coords2 = ship2.getPosition();
    const coords3 = ship3.getPosition();

    board.placeShip(coords1);
    board.placeShip(coords2);
    board.placeShip(coords3);
    console.table(board.getBoard());
    expect(board.getBoard()).toEqual([
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'D', ' ', ' ', 'D', 'D', 'D', 'D', 'D', ' '],
      [' ', ' ', ' ', ' ', 'D', 'S', 'S', 'S', 'D', ' '],
      [' ', ' ', ' ', ' ', 'D', 'D', 'D', 'D', 'D', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'D', 'D', 'D', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'S', 'S', 'D', ' ', ' ', ' ', ' ', ' ', ' '],
    ]);

    expect(() => {
      board.placeShip(coords3);
    }).toThrow();
  });
});
