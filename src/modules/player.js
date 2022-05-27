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

  shoot(coords, gameboard) {
    return gameboard.receiveAttack(coords);
  }
}

export default Player;
