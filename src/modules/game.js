import Render from './render';

class Game {
  #player1;
  #player2;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
  }

  #isGameFinished(player) {
    return player.getGameboard().allSunk();
  }

  play() {
    const p1Board = this.#player1.getGameboard().getBoard();
    const p2Board = this.#player2.getGameboard().getBoard();
    const boardEl1 = document.querySelector('#playerBoard');
    const boardEl2 = document.querySelector('#aiBoard');

    Render.board(boardEl1);
    Render.board(boardEl2);
    Render.ships(p1Board, boardEl1);

    boardEl2.addEventListener('click', (e) => {
      const row = +e.target.parentElement.dataset.row;
      const col = +e.target.dataset.col;

      if (p2Board[row][col] === 'X' || p2Board[row][col] === 'x') {
        return;
      }

      this.#player1.shoot([row, col], this.#player2.getGameboard());
      Render.attacks(p2Board, boardEl2);
      this.#isGameFinished(this.#player1);
      this.#player2.shoot(this.#player1.getGameboard());
      Render.attacks(p1Board, boardEl1);
      this.#isGameFinished(this.#player2);
    });
  }
}

export default Game;
