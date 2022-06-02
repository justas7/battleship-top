import Render from './render';

const dragAndDrop = function (gameboard) {
  document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('playerBoard');

    const dragStartHandler = (e) => {
      if (!e.target.classList.contains('ship')) {
        return;
      }
      const row = +e.target.dataset.row;
      const col = +e.target.dataset.col;

      const data = JSON.stringify([row, col]);

      e.dataTransfer.setData('application/json', data);
    };

    const dropHandler = function (e) {
      if (!e.target.dataset.col) return;
      e.preventDefault();

      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const ship = gameboard.findShip(data);

      const shipLength = ship.getPositions().length;
      const row = +e.target.parentElement.dataset.row;
      const col = +e.target.dataset.col;
      let newPositions = [];

      if (ship.getAxis() === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          if (col + i > 9) {
            /*if any coordinate is out of board bounds keep old coordinates */
            newPositions = ship.getPositions();
            break;
          }
          newPositions.push([row, col + i]);
        }
      }

      if (ship.getAxis() === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          if (row + i > 9) {
            newPositions = ship.getPositions();
            break;
          }
          newPositions.push([row + i, col]);
        }
      }

      if (
        newPositions.some(
          (coord) =>
            gameboard.getBoard()[coord[0]][coord[1]] === 'S' ||
            gameboard.getBoard()[coord[0]][coord[1]] === 'D'
        )
      )
        throw new Error('Cannot place ship here');

      gameboard.removeShip(ship);
      gameboard.placeShip(ship.setPositions(newPositions));
      Render.removeShips(boardEl);
      Render.ships(gameboard.getBoard(), boardEl);

      console.table(gameboard.getBoard());
    };

    boardEl.addEventListener('dragstart', dragStartHandler);
    boardEl.addEventListener('dragover', (e) => e.preventDefault());
    boardEl.addEventListener('drop', dropHandler);
  });
};

export default dragAndDrop;
