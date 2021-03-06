import Ship from './ship';

class Gameboard {
  #board;
  #ships;

  constructor() {
    this.setBoard();
  }

  setBoard() {
    this.#board = [];
    this.#ships = [];
    for (let i = 0; i < 10; i++) {
      let row = Array.from(Array(10), (val) => (val = ' '));
      this.#board.push(row);
    }

    return true;
  }

  getBoard() {
    return this.#board;
  }

  findShip(coords) {
    return this.#ships.find((ship) => {
      return ship.getPositions().find((position) => {
        return (
          JSON.stringify([position[0], position[1]]) ===
          JSON.stringify([...coords])
        );
      });
    });
  }

  getShips() {
    return this.#ships;
  }

  getCoordsAround(shipCoords) {
    const coords = shipCoords
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

    return coords;
  }

  placeShip(ship) {
    const notAllowed = ship
      .getPositions()
      .some(
        (pos) =>
          this.#board[pos[0]][pos[1]] !== 'S' ||
          this.#board[pos[0]][pos[1]] !== 'D'
      );
    if (!notAllowed) return notAllowed;

    ship.getPositions().forEach((coords) => {
      const [row, col] = [...coords];
      this.#board[row][col] = 'S';
      if (!this.#ships.includes(ship)) {
        this.#ships.push(ship);
      }
    });
    this.#disableCoords();
    return notAllowed;
  }

  /* set ships on board */
  #disableCoords() {
    this.#ships.forEach((ship) => {
      const coordsToDisable = this.getCoordsAround(ship.getPositions());
      coordsToDisable.forEach((coords) => {
        const [row, col] = [...coords];
        this.#board[row][col] !== 'S' ? (this.#board[row][col] = 'D') : '';
      });
    });
  }

  /* removes ship from board */
  removeShip(ship) {
    ship.getPositions().forEach((coords) => {
      const [row, col] = [...coords];

      if (this.#board[row][col] !== ' ') this.#board[row][col] = ' ';
    });

    this.#ships.splice(this.#ships.indexOf(ship), 1);

    const coordsAround = this.getCoordsAround(ship.getPositions());
    coordsAround.forEach((coords) => {
      const [row, col] = [...coords];
      if (this.#board[row][col] === 'D') this.#board[row][col] = ' ';
    });
    this.#disableCoords();
  }

  placeRandomShip(length) {
    let axis = Math.ceil(Math.random() * 2) === 1 ? 'horizontal' : 'vertical';
    let row =
      axis === 'horizontal'
        ? Math.floor(Math.random() * 10)
        : Math.floor(Math.random() * (10 - length));

    let col =
      axis === 'horizontal'
        ? Math.floor(Math.random() * (10 - length))
        : Math.floor(Math.random() * 10);

    let isAllowed = false;
    let counter = 0;
    while (isAllowed === false) {
      if (axis === 'horizontal') {
        for (let i = 0; i < length; i++) {
          if (this.#board[row][col + i] !== ' ') {
            isAllowed = false;
            col === 9 - length ? (col = 0) : (col += 1);
            if (counter % 10 === 0) {
              row === 9 ? (row = 0) : (row += 1);
            }
            break;
          }
          isAllowed = true;
        }
      }
      if (axis === 'vertical') {
        for (let i = 0; i < length; i++) {
          if (this.#board[row + i][col] !== ' ') {
            isAllowed = false;
            row === 9 - length ? (row = 0) : (row += 1);
            if (counter % 10 === 0) {
              col === 9 ? (col = 0) : (col += 1);
            }
            break;
          }
          isAllowed = true;
        }
      }

      counter += 1;
    }

    let coords = [];
    for (let i = 0; i < length; i++) {
      axis === 'horizontal'
        ? coords.push([row, col + i])
        : coords.push([row + i, col]);
    }

    this.placeShip(new Ship(coords, axis));
  }

  allSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }

  receiveAttack(coords) {
    const [row, col] = [...coords];

    if (this.#board[row][col] === 'S') {
      const ship = this.findShip(coords);
      ship?.hit(coords);
      this.#board[row][col] = 'X';
      if (ship.isSunk()) {
        const coordsToDisable = this.getCoordsAround(ship.getPositions());
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
