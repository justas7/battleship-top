class Ship {
  #position;

  constructor(coords) {
    this.#position = coords.map((coord) => [...coord, false]);
  }

  #compareArrays(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  #findCoord(coord) {
    const position = this.getPosition();
    return position.find((arr) => this.#compareArrays(arr, [...coord, false]));
  }

  getPosition() {
    return this.#position;
  }

  getSize() {
    return this.#position.length;
  }

  hit(coord) {
    const position = this.getPosition();
    if (position.some((arr) => this.#compareArrays(arr, [...coord, false]))) {
      this.#findCoord(coord)[2] = true;
      return true;
    }

    return false;
  }

  isSunk() {
    return this.getPosition().every((coord) => coord[2] === true);
  }
}

export default Ship;
