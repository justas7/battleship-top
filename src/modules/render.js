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

    return boardEl;
  };

  static ships = function (gameboard, boardEl) {
    gameboard.forEach((row, i) => {
      row.forEach((col, j) => {
        if (gameboard[i][j] === 'S' || gameboard[i][j] === 'D') {
          const row = boardEl.querySelector(`[data-row="${i}"]`);
          const col = row.querySelector(`[data-col="${j}"]`);
          gameboard[i][j] === 'S'
            ? col.classList.add('ship')
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
}

export default Render;
