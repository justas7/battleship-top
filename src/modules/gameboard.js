class Gameboard {
  #board = [];

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

  /* mark coordinates around placed ship */
  #disableCoords(ship) {
    const coordsToDisable = ship
      .flatMap((coord) => {
        return [
          [coord[0] - 1, coord[1] - 1],
          [coord[0] + 1, coord[1] + 1],
          [coord[0] + 1, coord[1] - 1],
          [coord[0] - 1, coord[1] + 1],
          [coord[0] + 1, coord[1] + 1],
          [coord[0] + 1, coord[1]],
          [coord[0] - 1, coord[1]],
          [coord[0], coord[1] + 1],
          [coord[0], coord[1] - 1],
        ];
      })
      .filter((coord) => {
        if (coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9)
          return [coord[0], coord[1]];
      });

    coordsToDisable.forEach((coord) => {
      const [row, col] = [...coord];

      if (this.#board[row][col] !== 'S') this.#board[row][col] = 'D';
    });
  }

  placeShip(shipPosition) {
    shipPosition.forEach((coord) => {
      const [row, col] = [...coord];
      try {
        if (this.#board[row][col] === ' ') {
          this.#board[row][col] = 'S';
        }
      } catch (err) {
        throw err;
      }
    });
    this.#disableCoords(shipPosition);
  }
}

export default Gameboard;
