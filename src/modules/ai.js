import Player from './player';

class Ai extends Player {
  constructor(gameboard) {
    super(gameboard);
  }

  #moves = [];

  clearMoves() {
    return (this.#moves = []);
  }
  /* keep track of ai's attacks */

  shoot(gameboard) {
    const lastIndex = this.#moves.length - 1;

    if (this.#moves[lastIndex]?.includes(true)) {
      const row = this.#moves[lastIndex][0];
      const col = this.#moves[lastIndex][1];
      const ship = gameboard.findShip([row, col]);

      if (!ship.isSunk()) {
        const shipCoords = ship.getPositions();
        const coordsToHit = shipCoords.find((coord) => coord[2] === false);

        gameboard.findShip([coordsToHit[0], coordsToHit[1]])
          ? this.#moves.push([coordsToHit[0], coordsToHit[1], true])
          : this.#moves.push([coordsToHit[0], coordsToHit[1], false]);
        return gameboard.receiveAttack([coordsToHit[0], coordsToHit[1]]);
      }
    }

    const board = gameboard.getBoard();
    let randNum = Math.floor(Math.random() * gameboard.getBoard().length);
    let randomRow = board[randNum];

    const areAnyEmpty = function (arr) {
      return arr.some((cell) => cell === 'S' || cell === 'D' || cell === ' ');
    };

    while (!areAnyEmpty(randomRow)) {
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

    gameboard.findShip([row, col])
      ? this.#moves.push([row, col, true])
      : this.#moves.push([row, col, false]);

    return gameboard.receiveAttack([row, col]);
  }
}

export default Ai;
