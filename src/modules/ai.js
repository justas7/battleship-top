import Player from './player';

class Ai extends Player {
  constructor(gameboard) {
    super(gameboard);
  }

  shoot(gameboard) {
    const board = gameboard.getBoard();
    let randNum = Math.floor(Math.random() * gameboard.getBoard().length);
    let randomRow = board[randNum];

    const areAnyEmpty = function (arr) {
      return arr.some((cell) => cell === 'S' || cell === 'D' || cell === ' ');
    };

    while (areAnyEmpty(randomRow) === false) {
      ++randNum < 10
        ? (randomRow = board[randNum])
        : (randomRow = board[(randNum = 0)]);
    }

    const row = board.indexOf(randomRow);
    const availableCols = randomRow
      .map((cell, index) => {
        return cell === 'X' || cell === 'x' ? cell : index;
      })
      .filter((cell) => typeof cell === 'number');

    const col = availableCols[Math.floor(Math.random() * availableCols.length)];

    return gameboard.receiveAttack([row, col]);
  }
}

export default Ai;
