class Player {
  #gameboard;

  constructor(gameboard) {
    this.#gameboard = gameboard;
  }

  getGameboard() {
    return this.#gameboard;
  }

  shoot(coords, gameboard) {
    return gameboard.receiveAttack(coords);
  }
}

export default Player;
