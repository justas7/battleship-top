import Render from './render';

class Game {
  #player1;
  #player2;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
  }

  #boardEl1 = document.querySelector('#playerBoard');
  #boardEl2 = document.querySelector('#aiBoard');

  #randomizeStartingShips(player) {
    player.getGameboard().placeRandomShip(5);
    player.getGameboard().placeRandomShip(4);
    player.getGameboard().placeRandomShip(3);
    player.getGameboard().placeRandomShip(3);
    player.getGameboard().placeRandomShip(2);
  }

  initStartingBoards() {
    this.#randomizeStartingShips(this.#player1);
    this.#randomizeStartingShips(this.#player2);
  }

  #gameControl = (e) => {
    const row = +e.target.parentElement.dataset.row;
    const col = +e.target.dataset.col;
    const p1Board = this.#player1.getGameboard();
    const p2Board = this.#player2.getGameboard();

    if (
      p2Board.getBoard()[row][col] === 'X' ||
      p2Board.getBoard()[row][col] === 'x'
    ) {
      return;
    }

    this.#player1.shoot([row, col], p2Board);
    Render.attacks(p2Board.getBoard(), this.#boardEl2);

    if (this.#isGameFinished()) {
      Render.togglePlayAgain();
      this.#boardEl2.removeEventListener('click', this.#gameControl);
      return;
    }

    this.#player2.shoot(p1Board);
    Render.attacks(p1Board.getBoard(), this.#boardEl1);
    if (this.#isGameFinished()) {
      Render.togglePlayAgain();
      this.#boardEl2.removeEventListener('click', this.#gameControl);
      return;
    }
  };

  #isGameFinished() {
    return (
      this.#player1.getGameboard().allSunk() ||
      this.#player2.getGameboard().allSunk()
    );
  }

  play = () => {
    Render.togglePlayBtn();
    this.#boardEl2.addEventListener('click', this.#gameControl);
  };

  playAgain = () => {
    Render.togglePlayAgain();

    this.#player1.getGameboard().setBoard();
    this.#player2.getGameboard().setBoard();
    this.initStartingBoards();

    Render.clearEl(this.#boardEl1);
    Render.clearEl(this.#boardEl2);
    Render.board(this.#boardEl1);
    Render.board(this.#boardEl2);
    Render.ships(this.#player1.getGameboard().getBoard(), this.#boardEl1);
    Render.togglePlayBtn();
  };
}

export default Game;
