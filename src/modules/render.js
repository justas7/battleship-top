class Render {
  static board = function (boardEl) {
    for (let i = 0; i <= 10; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.setAttribute('data-row', i - 1);

      for (let j = 0; j <= 10; j++) {
        const col = document.createElement('div');
        if (i === 0 && j >= 1) {
          col.textContent = String.fromCharCode(64 + j);
          col.classList.add('xCoords');
        }
        if (j === 0 && i >= 1) {
          col.textContent = i;
          col.classList.add('yCoords');
        }
        if (j > 0 && i > 0) {
          col.setAttribute('data-col', j - 1);
          col.classList.add('col');
        }
        row.appendChild(col);
      }

      boardEl.appendChild(row);
    }
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

  static removeShips = function (boardEl) {
    const ships = boardEl.querySelectorAll('.ship');
    [...ships].forEach((ship) => ship.remove());
    this.toggleDisabledCells();
  };

  static toggleDisabledCells = function () {
    const disabledCells = [...document.querySelectorAll('.disabledCell')];
    disabledCells.forEach((cell) => cell.classList.toggle('disabledCell'));
  };

  static endGameMessage = function (message, opacity, pos, color) {
    const container = document.querySelector('.endGameMessage');
    container.textContent = message;
    container.style.opacity = opacity;
    container.style.color = color;
    container.style.transform = `translateY(${pos})`;
  };

  static togglePlayBtn = function () {
    const playBtn = document.querySelector('.playBtnContainer');
    const aiOverlay = document.querySelector('.aiOverlay');
    this.endGameMessage(null, '0', '-100px');

    aiOverlay.classList.toggle('hidden');
    playBtn.classList.toggle('hidden');
  };

  static clearEl(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  static togglePlayAgain = function () {
    const pOverlay = document.querySelector('.pOverlay');

    pOverlay.classList.toggle('hidden');
  };
}

export default Render;
