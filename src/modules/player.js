class Player {
  #gameboard;
  #myTurn;

  constructor(gameboard, myTurn) {
    this.#gameboard = gameboard;
    this.#myTurn = myTurn;
  }

  isMyTurn() {
    return this.#myTurn;
  }

  toggleMyTurn() {
    return (this.#myTurn = !this.#myTurn);
  }

  getGameboard() {
    return this.#gameboard;
  }
}

export default Player;
