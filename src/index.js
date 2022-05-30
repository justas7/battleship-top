import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());

const game = new Game(player1, player2);
game.initStartingBoard(player1);
game.initStartingBoard(player2);
game.play();
game.playAgain();
