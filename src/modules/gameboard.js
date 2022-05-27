class Gameboard {
  #board = [];
  #ships = [];

  setBoard() {
    for (let i = 0; i < 10; i++) {
      let row = Array.from(Array(10), (val) => (val = ' '));
      this.#board.push(row);
    }
    return true;
  }

  getBoard() {
    return this.#board;
  }

  #findShip(coords) {
    return this.#ships.find((ship) => {
      return ship.getPositions().find((position) => {
        return JSON.stringify(position) === JSON.stringify([...coords, false]);
      });
    });
  }

  /* mark coordinates around placed ship */
  #disableCoords(ship) {
    const coordsToDisable = ship
      .flatMap((coords) => {
        return [
          [coords[0] - 1, coords[1] - 1],
          [coords[0] + 1, coords[1] + 1],
          [coords[0] + 1, coords[1] - 1],
          [coords[0] - 1, coords[1] + 1],
          [coords[0] + 1, coords[1] + 1],
          [coords[0] + 1, coords[1]],
          [coords[0] - 1, coords[1]],
          [coords[0], coords[1] + 1],
          [coords[0], coords[1] - 1],
        ];
      })
      .filter((coords) => {
        if (
          coords[0] >= 0 &&
          coords[0] <= 9 &&
          coords[1] >= 0 &&
          coords[1] <= 9
        )
          return [coords[0], coords[1]];
      });

    coordsToDisable.forEach((coords) => {
      const [row, col] = [...coords];
      if (this.#board[row][col] !== 'S') this.#board[row][col] = 'D';
    });
  }

  placeShip(ship) {
    ship.getPositions().forEach((coords) => {
      const [row, col] = [...coords];
      try {
        if (this.#board[row][col] !== ' ')
          throw new Error('Cannot place ship on this position');
        this.#board[row][col] = 'S';
        this.#ships.push(ship);
      } catch (err) {
        throw err;
      }
    });
    this.#disableCoords(ship.getPositions());
  }

  receiveAttack(coords) {
    const [row, col] = [...coords];

    if (this.#board[row][col] === 'S') {
      this.#findShip(coords)?.hit(coords);
      this.#board[row][col] = 'X';
      return true;
    }

    if (this.#board[row][col] === 'x' || this.#board[row][col] === 'X') {
      throw new Error('You have already attacked this position');
    }

    this.#board[row][col] = 'x';
    return false;
  }

  allSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
