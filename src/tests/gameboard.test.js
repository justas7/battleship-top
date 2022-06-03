import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('Gameboard class', () => {
  let board, ship1, ship2;
  beforeEach(() => {
    board = new Gameboard();
    ship1 = new Ship([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ]);

    ship2 = new Ship([
      [9, 1],
      [9, 2],
    ]);

    board.placeShip(ship1);
    board.placeShip(ship2);
  });

  test('create 10x10 board as multidimensional array', () => {
    expect(board.getBoard().length).toBe(10);
  });
  test('create 10x10 board as multidimensional array', () => {
    expect(board.getBoard().flat().length).toBe(100);
  });

  test('place ship on board', () => {
    console.table(board.getBoard());
    expect(board.getBoard()).toEqual([
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['S', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'D', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'D', 'D', 'D', ' ', ' ', ' ', ' ', ' ', ' '],
      ['D', 'S', 'S', 'D', ' ', ' ', ' ', ' ', ' ', ' '],
    ]);

    expect(() => {
      board.placeShip([
        [6, 0],
        [7, 0],
      ]);
    }).toThrowError();
  });

  test('mark attack on board', () => {
    const ship3 = new Ship([
      [6, 0],
      [7, 0],
    ]);
    board.placeShip(ship3);
    board.receiveAttack([6, 0]);
    board.receiveAttack([7, 0]);
    board.receiveAttack([0, 2]);

    expect(board.receiveAttack([0, 0])).toBeTruthy();
    expect(board.getBoard()[0][2]).toBe('x');
    expect(board.getBoard()[0][0]).toBe('X');
    expect(ship3.isSunk()).toBeTruthy();
  });

  test('throw error if position was already attacked', () => {
    expect(() => {
      board.receiveAttack([6, 0]);
      board.receiveAttack([6, 0]);
      console.table(board.getBoard());
    }).toThrowError();
  });

  test('check if all ships are sunk', () => {
    board.receiveAttack([0, 0]);
    board.receiveAttack([1, 0]);
    board.receiveAttack([2, 0]);
    board.receiveAttack([3, 0]);
    board.receiveAttack([9, 1]);
    board.receiveAttack([9, 2]);

    expect(board.allSunk()).toBeTruthy();
  });

  test('if ship is sunk disable cells around it', () => {
    const gameboard = board.getBoard();
    board.receiveAttack([9, 1]);
    board.receiveAttack([9, 2]);

    ship2.isSunk();

    expect([gameboard[9][0], gameboard[8][1], gameboard[8][3]]).toEqual([
      'x',
      'x',
      'x',
    ]);
  });
});
