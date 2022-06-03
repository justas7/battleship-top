import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';
import DragAndDrop from './modules/dragAndDrop';
import Render from './modules/render';

const boardEl1 = document.querySelector('#playerBoard');
const boardEl2 = document.querySelector('#aiBoard');
const playBtn = document.querySelector('.play');
const playAgainBtn = document.querySelector('.playAgain');

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());
const game = new Game(player1, player2);

game.randomizeStartingShips(player1);
game.randomizeStartingShips(player2);

Render.board(boardEl1);
Render.board(boardEl2);
Render.ships(player1.getGameboard().getBoard(), boardEl1);

const dragAndDrop = new DragAndDrop(player1.getGameboard(), boardEl1);
dragAndDrop.handler();

playBtn.addEventListener('click', () => {
  game.play();
  Render.playBtn();
  dragAndDrop.removeHandler();
});

playAgainBtn.addEventListener('click', () => {
  Render.playBtn();
  Render.clearEl(boardEl1);
  Render.clearEl(boardEl2);
  const newPlayer1 = new Player(new Gameboard());
  const newPlayer2 = new Ai(new Gameboard());
  const newGame = new Game(newPlayer1, newPlayer2);

  newGame.randomizeStartingShips(newPlayer1);
  newGame.randomizeStartingShips(newPlayer2);

  Render.board(boardEl1);
  Render.board(boardEl2);
  Render.ships(newPlayer1.getGameboard().getBoard(), boardEl1);

  const newDragAndDrop = new DragAndDrop(newPlayer1.getGameboard(), boardEl1);
  newDragAndDrop.handler();

  const modal = document.querySelector('.modal');
  modal.classList.add('hidden');

  playBtn.addEventListener('click', () => {
    newGame.play();
    Render.playBtn();
    newDragAndDrop.removeHandler();
  });
});
