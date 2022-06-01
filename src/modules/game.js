import Render from './render';
import Ai from './ai';
import Player from './player';
import Gameboard from './gameboard';

class Game {
  #player1;
  #player2;

  constructor(player1, player2) {
    this.#player1 = player1;
    this.#player2 = player2;
  }

  #boardEl1 = document.querySelector('#playerBoard');
  #boardEl2 = document.querySelector('#aiBoard');

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
      Render.playAgain();
      this.#boardEl2.removeEventListener('click', this.#gameControl);
      return;
    }

    this.#player2.shoot(p1Board);
    Render.attacks(p1Board.getBoard(), this.#boardEl1);
    if (this.#isGameFinished()) {
      Render.playAgain();
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

  play() {
    const p1Board = this.#player1.getGameboard().getBoard();
    const p2Board = this.#player2.getGameboard().getBoard();
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
    Render.board(this.#boardEl1);
    Render.board(this.#boardEl2);
    Render.ships(p1Board, this.#boardEl1);
    // Render.ships(p2Board, this.#boardEl2);

    this.#boardEl2.addEventListener('click', this.#gameControl);
  }

  #clearEl(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  randomizeStartingShips(player) {
    // player.getGameboard().placeRandomShip(5);
    // player.getGameboard().placeRandomShip(4);
    // player.getGameboard().placeRandomShip(3);
    player.getGameboard().placeRandomShip(3);
    player.getGameboard().placeRandomShip(2);
  }

  playAgain() {
    const playAgainBtn = document.querySelector('.playAgain');
    playAgainBtn.addEventListener('click', () => {
      this.#clearEl(this.#boardEl1);
      this.#clearEl(this.#boardEl2);

      const player1 = new Player(new Gameboard());
      const player2 = new Ai(new Gameboard());

      this.randomizeStartingShips(player1);
      this.randomizeStartingShips(player2);

      const game = new Game(player1, player2);
      game.play();
    });
  }
}

export default Game;
