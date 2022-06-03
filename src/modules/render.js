class Render {
  static board = function (boardEl) {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-row', i);
      for (let j = 0; j < 10; j++) {
        const col = document.createElement('div');
        col.setAttribute('data-col', j);
        col.classList.add('col');
        row.appendChild(col);
      }
      boardEl.appendChild(row);
    }
  };

  static removeShips = function (boardEl) {
    const ships = boardEl.querySelectorAll('.ship');
    const disabledCells = boardEl.querySelectorAll('.disabledCell');
    [...ships].forEach((ship) => ship.remove());
    [...disabledCells].forEach((cell) => cell.classList.remove('disabledCell'));
  };

  /* first parameter is board of gameboard object */
  static ships = function (gameboard, boardEl) {
    gameboard.forEach((row, i) => {
      row.forEach((col, j) => {
        if (gameboard[i][j] === 'S' || gameboard[i][j] === 'D') {
          const row = boardEl.querySelector(`[data-row="${i}"]`);
          const col = row.querySelector(`[data-col="${j}"]`);
          const ship = document.createElement('div');
          ship.setAttribute('draggable', 'true');
          ship.setAttribute('data-row', row.dataset.row);
          ship.setAttribute('data-col', col.dataset.col);
          ship.classList.add('ship');
          ship.classList.add('ship');
          gameboard[i][j] === 'S'
            ? col.appendChild(ship)
            : col.classList.add('disabledCell');
        }
      });
    });
  };

  static attacks = function (gameboard, boardEl) {
    gameboard.forEach((row, i) => {
      row.forEach((col, j) => {
        if (gameboard[i][j] === 'X' || gameboard[i][j] === 'x') {
          const row = boardEl.querySelector(`[data-row="${i}"]`);
          const col = row.querySelector(`[data-col="${j}"]`);

          gameboard[i][j] === 'X'
            ? col.classList.add('hit')
            : col.classList.add('miss');
        }
      });
    });
  };

  static playAgain = function () {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
  };
}

export default Render;
