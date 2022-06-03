import Render from './render';
import Ship from './ship';

const dragAndDrop = function (gameboard) {
  document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('playerBoard');
    const dragStartHandler = (e) => {
      const row = +e.target.dataset.row;
      const col = +e.target.dataset.col;
      if (gameboard.getBoard()[row][col] !== 'S') return;

      const draggableCol = document.createElement('div');

      draggableCol.classList.add('col');
      draggableCol.classList.add('draggableCol');
      const ship = gameboard.findShip([row, col]);
      document.querySelector('body').appendChild(draggableCol);

      if (!ship) return;

      const positions = ship.getPositions();

      /* save ship's positions, remove ship and transfer info */
      const data = positions.map((pos) => [pos[0], pos[1]]);

      const oldData = JSON.stringify({
        positions: data,
        axis: ship.getAxis(),
        length: data.length,
        row: row,
        col: col,
      });

      ship.getAxis() === 'horizontal'
        ? (draggableCol.style.width = `${30 * data.length}px`)
        : (draggableCol.style.height = `${30 * data.length}px`);

      e.dataTransfer.setDragImage(draggableCol, 0, 0);
      e.dataTransfer.setData('application/json', oldData);
    };

    const dragHandler = function (e) {
      e.preventDefault();
    };

    const dropHandler = function (e) {
      e.preventDefault();
      const oldData = JSON.parse(e.dataTransfer.getData('application/json'));

      /* if something went wrong keep old ship else remove it */
      if (!oldData || e.currentTarget.id !== 'playerBoard') {
        return;
      }
      const oldShip = gameboard.findShip([...oldData.positions[0]]);
      if (gameboard.getShips().includes(oldShip)) {
        gameboard.removeShip(oldShip);
      }

      const board = gameboard.getBoard();
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
      gameboard.placeShip(ship);
      console.table(board);
      Render.removeShips(boardEl);
      Render.ships(board, boardEl);
    };

    boardEl.addEventListener('dragstart', dragStartHandler);
    boardEl.addEventListener('dragover', dragHandler);
    boardEl.addEventListener('drop', dropHandler);
  });
};

export default dragAndDrop;
