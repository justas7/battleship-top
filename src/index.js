import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';
import dragAndDrop from './modules/dragAndDrop';

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());

const game = new Game(player1, player2);
game.randomizeStartingShips(player1);
game.randomizeStartingShips(player2);

console.table(player1.getGameboard().getBoard());

game.play();
game.playAgain();
dragAndDrop(player1.getGameboard());
