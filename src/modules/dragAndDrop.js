import Render from './render';
import Ship from './ship';

const dragAndDrop = function (gameboard) {
  document.addEventListener('DOMContentLoaded', () => {
    const boardEl = document.getElementById('playerBoard');

    const dragStartHandler = (e) => {
      const row = +e.target.dataset.row;
      const col = +e.target.dataset.col;

      if (
        !e.target.classList.contains('ship') &&
        gameboard.getBoard()[row][col] !== 'S'
      ) {
        return;
      }

      const ship = gameboard.findShip([row, col]);

      if (!ship) return;

      const positions = ship.getPositions();

      /* save ship's positions, remove ship and transfer info */
      const data = positions.map((pos) => [pos[0], pos[1]]);

      const oldData = JSON.stringify({
        positions: data,
        axis: ship.getAxis(),
        length: data.length,
      });

      if (gameboard.getShips().includes(ship)) {
        gameboard.removeShip(ship);
      }
      e.dataTransfer.setData('application/json', oldData);
    };

    const dragHandler = function (e) {
      e.preventDefault();
    };

    const dropHandler = function (e) {
      e.preventDefault();
      const oldData = JSON.parse(e.dataTransfer.getData('application/json'));

      const oldPositions = oldData.positions;

      const row = +e.target.parentElement.dataset.row;
      const col = +e.target.dataset.col;
      let newPositions = [];
      console.log(oldData.positions);

      if (oldData.axis === 'horizontal') {
        for (let i = 0; i < oldData.length; i++) {
          if (col + i > 9) {
            /*if any coordinate is out of bounds keep old coordinates */
            newPositions = oldData.positions;
            break;
          }
          newPositions.push([row, col + i]);
        }
      }

      if (oldData.axis === 'vertical') {
        for (let i = 0; i < oldData.length; i++) {
          if (row + i > 9) {
            newPositions = oldData.positions;
            break;
          }
          newPositions.push([row + i, col]);
        }
      }

      const isSameShip = newPositions.some((pos) =>
        oldPositions.some(
          (oldPos) => JSON.stringify(pos) === JSON.stringify(oldPos)
        )
      );

      if (
        (!e.target.dataset.col ||
          e.target.classList.contains('ship') ||
          e.target.classList.contains('disabledCell')) &&
        isSameShip === false
      ) {
        const ship = new Ship(oldPositions, oldData.axis);
        gameboard.placeShip(ship);
        return;
      }

      const ship = new Ship(newPositions, oldData.axis);
      gameboard.placeShip(ship);
      Render.removeShips(boardEl);
      Render.ships(gameboard.getBoard(), boardEl);
      console.table(gameboard.getBoard());
    };
    boardEl.addEventListener('click', (e) => console.log(e.target));
    document.addEventListener('dragstart', dragStartHandler);
    document.addEventListener('dragover', dragHandler);
    document.addEventListener('drop', dropHandler);
  });
};

export default dragAndDrop;
