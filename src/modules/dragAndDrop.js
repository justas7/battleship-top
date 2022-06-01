import Render from './render';

const dragAndDrop = function (gameboard) {
  document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('playerBoard');

    const dragStartHandler = (e) => {
      if (!e.target.classList.contains('ship')) {
        return;
      }
      const row = +e.target.dataset.row;
      const col = +e.target.dataset.col;
      const data = JSON.stringify([row, col]);

      e.dataTransfer.setData('application/json', data);
    };

    const moveShip = function (ship) {};

    const dropHandler = function (e) {
      if (!e.target.dataset.col) return;
      e.preventDefault();
      const boardEl = document.getElementById('playerBoard');
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const ship = gameboard.findShip(data);

      const row = +e.target.parentElement.dataset.row;
      const col = +e.target.dataset.col;

      console.log(row, col);

      const isSamePosition = ship
        .getPositions()
        .some((val) => JSON.stringify(val) === JSON.stringify([row, col]));

      console.log(isSamePosition);

      gameboard.removeShip(ship);

      ship.setPositions([
        [row, col],
        [row, col + 1],
      ]);

      gameboard.placeShip(ship);
      console.table(gameboard.getBoard());

      Render.ships(gameboard.getBoard(), boardEl);
    };

    board.addEventListener('dragstart', dragStartHandler);
    board.addEventListener('dragover', (e) => e.preventDefault());
    board.addEventListener('drop', dropHandler);
    board.addEventListener('click', () => console.log(gameboard.getShips()));
  });
};

export default dragAndDrop;
