import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';
import DragAndDrop from './modules/dragAndDrop';

const boardEl = document.querySelector('#playerBoard');

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());
const dragAndDrop = new DragAndDrop(player1.getGameboard(), boardEl);
const game = new Game(player1, player2);
game.randomizeStartingShips(player1);
game.randomizeStartingShips(player2);

game.play();
game.playAgain();

dragAndDrop.handler();
