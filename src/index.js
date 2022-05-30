import './styles/styles.css';
import Gameboard from './modules/gameboard';
import Ship from './modules/ship';
import Ai from './modules/ai';
import Player from './modules/player';
import Game from './modules/game';

const player1 = new Player(new Gameboard());
const player2 = new Ai(new Gameboard());

player1.getGameboard().placeRandomShip(5);
player1.getGameboard().placeRandomShip(4);
player1.getGameboard().placeRandomShip(3);
player1.getGameboard().placeRandomShip(3);
player1.getGameboard().placeRandomShip(2);

player2.getGameboard().placeRandomShip(5);
player2.getGameboard().placeRandomShip(4);
player2.getGameboard().placeRandomShip(3);
player2.getGameboard().placeRandomShip(3);
player2.getGameboard().placeRandomShip(2);

console.table(player1.getGameboard().getBoard());

const game = new Game(player1, player2);
game.play();
