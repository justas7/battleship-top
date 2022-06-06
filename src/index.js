import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';
import DragDropRotate from './modules/dragDropRotate';
import Render from './modules/render';

const boardEl1 = document.querySelector('#playerBoard');
const boardEl2 = document.querySelector('#aiBoard');
const playBtn = document.querySelector('.play');
const playAgainBtn = document.querySelector('.playAgain');

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());
const ddr = new DragDropRotate(player1.getGameboard(), boardEl1);
const game = new Game(player1, player2);

game.initStartingBoards();
ddr.addHandler();
Render.board(boardEl1);
Render.board(boardEl2);

Render.ships(player1.getGameboard().getBoard(), boardEl1);

playBtn.addEventListener('click', () => {
  Render.toggleDisabledCells();
  ddr.removeHandler();
  game.play();
});
playAgainBtn.addEventListener('click', () => {
  Render.toggleDisabledCells();
  ddr.addHandler();
  game.playAgain();
});
