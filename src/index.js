import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ship from './modules/ship';
import * as render from './modules/render/placementBoard';
import Ai from './modules/ai';

const ai = new Ai([1, 2]);

const ship1 = new Ship([
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
]);

const ship2 = new Ship([
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
]);
const ship3 = new Ship([
  [0, 4],
  [1, 4],
  [2, 4],
]);
const ship4 = new Ship([
  [0, 6],
  [1, 6],
  [2, 6],
]);
const ship5 = new Ship([
  [0, 8],
  [1, 8],
]);

const board = new Gameboard();
const board2 = new Gameboard();
board.setBoard();
board.placeShip(ship1);
board.placeShip(ship2);
board.placeShip(ship3);
board.placeShip(ship4);
board.placeShip(ship5);

board2.setBoard();
board2.placeShip(ship1);
board2.placeShip(ship2);
board2.placeShip(ship3);
board2.placeShip(ship4);
board2.placeShip(ship5);

const boardEl = document.querySelector('#playerBoard');
const boardEl2 = document.querySelector('#aiBoard');

render.renderBoard(boardEl);
// render.renderShips(board.getBoard(), boardEl);
render.renderAttacks(board.getBoard(), boardEl);

render.renderBoard(boardEl2);
render.renderShips(board.getBoard(), boardEl2);
render.renderAttacks(board.getBoard(), boardEl2);

boardEl.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('hit') ||
    e.target.classList.contains('miss')
  ) {
    return;
  }
  const row = +e.target.parentElement.dataset.row;
  const col = +e.target.dataset.col;
  board.receiveAttack([row, col]);
  render.renderAttacks(board.getBoard(), boardEl);
});
