import Ship from './ship';

class Gameboard {
  #board = [];
  #ships = [];

  constructor() {
    this.#setBoard();
  }

  #setBoard() {
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
        return (
          JSON.stringify([position[0], position[1]]) ===
          JSON.stringify([...coords])
        );
      });
    });
  }

  /* mark coordinates around placed ship */
  #getCoordsAround(ship) {
    const coordsAround = ship
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

    return coordsAround;
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

    const coordsToDisable = this.#getCoordsAround(ship.getPositions());
    coordsToDisable.forEach((coords) => {
      const [row, col] = [...coords];
      this.#board[row][col] !== 'S' ? (this.#board[row][col] = 'D') : '';
    });
  }

  placeRandomShip(length) {
    let horiOrVert = Math.ceil(
      Math.random() * 2
    ); /* 1 for horizontal, 2 for vertical */
    let row =
      horiOrVert === 1
        ? Math.floor(Math.random() * 10)
        : Math.floor(Math.random() * (10 - length));

    let col =
      horiOrVert === 1
        ? Math.floor(Math.random() * (10 - length))
        : Math.floor(Math.random() * 10);

    let isAllowed = false;

    /* check  for horizontal */
    // while (isAllowed === false) {
    //   if (horiOrVert === 1) {
    //     for (let i = 0; i < length; i++) {
    //       if (this.#board[row][col + i] !== ' ') {
    //         isAllowed = false;
    //         row === 9 - length ? (row = 0) : (row += 1);
    //         horiOrVert = 2;
    //         break;
    //       }
    //       isAllowed = true;
    //     }
    //   }

    //   /* check  for vertical*/
    //   if (horiOrVert === 2) {
    //     for (let i = 0; i < length; i++) {
    //       if (this.#board[row + i][col] !== ' ') {
    //         isAllowed = false;
    //         col === 9 - length ? (col = 0) : (col += 1);
    //         horiOrVert = 1;
    //         break;
    //       }
    //       isAllowed = true;
    //     }
    //   }
    // }

    let coords = [];
    for (let i = 0; i < length; i++) {
      horiOrVert === 1
        ? coords.push([row, col + i])
        : coords.push([row + i, col]);
    }

    console.log(row, col);
  }

  allSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  receiveAttack(coords) {
    const [row, col] = [...coords];

    if (this.#board[row][col] === 'S') {
      const ship = this.#findShip(coords);
      ship?.hit(coords);
      this.#board[row][col] = 'X';
      if (ship.isSunk()) {
        const coordsToDisable = this.#getCoordsAround(ship.getPositions());
        coordsToDisable.forEach((coords) => {
          const [row, col] = [...coords];
          this.#board[row][col] !== 'X' ? (this.#board[row][col] = 'x') : '';
        });
      }
      return true;
    }

    if (this.#board[row][col] === 'x' || this.#board[row][col] === 'X') {
      throw new Error('You have already attacked this position');
    }

    this.#board[row][col] = 'x';
    return false;
  }
}

export default Gameboard;
