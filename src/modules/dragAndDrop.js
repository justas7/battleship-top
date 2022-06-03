import Render from './render';
import Ship from './ship';

class DragAndDrop {
  #board;
  #boardEl;
  constructor(board, boardEl) {
    this.#board = board;
    this.#boardEl = boardEl;
  }

  #dragStartHandler = (e) => {
    const row = +e.target.dataset.row;
    const col = +e.target.dataset.col;
    if (this.#board.getBoard()[row][col] !== 'S') return;

    const draggableCol = document.createElement('div');
    draggableCol.classList.add('col');
    draggableCol.classList.add('draggableCol');
    document.querySelector('body').appendChild(draggableCol);
    const ship = this.#board.findShip([row, col]);

    if (!ship) return;

    const positions = ship.getPositions();

    /* save ship's positions */
    const data = positions.map((pos) => [pos[0], pos[1]]);

    const oldData = JSON.stringify({
      positions: data,
      axis: ship.getAxis(),
      length: data.length,
      row: row,
      col: col,
    });

    /* set dragabable iamge depending on ship length and axis */
    ship.getAxis() === 'horizontal'
      ? (draggableCol.style.width = `${30 * data.length}px`)
      : (draggableCol.style.height = `${30 * data.length}px`);

    e.dataTransfer.setDragImage(draggableCol, 0, 0);
    e.dataTransfer.setData('application/json', oldData);
  };

  #dragHandler(e) {
    e.preventDefault();
  }

  #dropHandler = (e) => {
    e.preventDefault();
    const oldData = JSON.parse(e.dataTransfer.getData('application/json'));

    /* if something went wrong keep old ship else remove it */
    if (!oldData || e.currentTarget.id !== 'playerBoard') {
      return;
    }
    const oldShip = this.#board.findShip([...oldData.positions[0]]);
    if (this.#board.getShips().includes(oldShip)) {
      this.#board.removeShip(oldShip);
    }

    const board = this.#board.getBoard();
    let row, col;

    const dataset = e.target.dataset;
    e.target.classList.contains('ship')
      ? (row = +dataset.row)
      : (row = +e.target.parentElement.dataset.row);
    e.target.classList.contains('ship')
      ? (col = +dataset.col)
      : (col = +e.target.dataset.col);

    let newPositions = [];

    if (oldData.axis === 'horizontal') {
      for (let i = 0; i < oldData.length; i++) {
        if (col + i > 9 || board[row][col + i] !== ' ') {
          /*if any coordinate is out of bounds keep old coordinates */
          newPositions = oldData.positions;
          break;
        }
        newPositions.push([row, col + i]);
      }
    }

    if (oldData.axis === 'vertical') {
      for (let i = 0; i < oldData.length; i++) {
        if (row + i > 9 || board[row + i][col] !== ' ') {
          newPositions = oldData.positions;
          break;
        }
        newPositions.push([row + i, col]);
      }
    }

    const ship = new Ship(newPositions, oldData.axis);
    this.#board.placeShip(ship);
    Render.removeShips(this.#boardEl);
    Render.ships(board, this.#boardEl);
  };

  #rotateHandler = (e) => {
    const row = +e.target.dataset.row;
    const col = +e.target.dataset.col;
    const board = this.#board.getBoard();
    if (board[row][col] !== 'S') return;

    const ship = this.#board.findShip([row, col]);
    const shipLength = ship.getPositions().length;
    let newPositions = [];

    let newAxis = ship.getAxis() === 'horizontal' ? 'vertical' : 'horizontal';

    if (this.#board.getShips().includes(ship)) {
      this.#board.removeShip(ship);
    }

    if (ship.getAxis() === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        if (row + i > 9 || board[row + i][col] !== ' ') {
          /*if any coordinate is not allowed keep old position*/
          newPositions = [...ship.getPositions()];
          newAxis = 'horizontal';
          break;
        }
        newPositions.push([row + i, col]);
      }
    }

    if (ship.getAxis() === 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        if (col + i > 9 || board[row][col + i] !== ' ') {
          newPositions = [...ship.getPositions()];
          newAxis = 'vertical';
          break;
        }
        newPositions.push([row, col + i]);
      }
    }

    const newShip = new Ship(newPositions, newAxis);
    this.#board.placeShip(newShip);
    Render.removeShips(this.#boardEl);
    Render.ships(board, this.#boardEl);
  };

  handler() {
    document.addEventListener('DOMContentLoaded', () => {
      this.#boardEl.addEventListener('dragstart', this.#dragStartHandler);
      this.#boardEl.addEventListener('dragover', this.#dragHandler);
      this.#boardEl.addEventListener('drop', this.#dropHandler);
      this.#boardEl.addEventListener('dblclick', this.#rotateHandler);
    });
  }
}

export default DragAndDrop;
