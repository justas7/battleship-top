class Ship {
  #position;

  constructor(coords) {
    this.#position = coords.map((coord) => [...coord, false]);
  }

  #compareArrays(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  #findCoord(coords) {
    const position = this.getPositions();
    return position.find((arr) => this.#compareArrays(arr, [...coords, false]));
  }

  getPositions() {
    return this.#position;
  }

  hit(coords) {
    const position = this.getPositions();
    if (position.some((arr) => this.#compareArrays(arr, [...coords, false]))) {
      this.#findCoord(coords)[2] = true;
      return true;
    }

    return false;
  }

  isSunk() {
    return this.getPositions().every((coord) => coord[2] === true);
  }
}

export default Ship;
