class Ship {
  #position;
  #axis;

  constructor(coords, axis) {
    this.setPositions(coords);
    this.#axis = axis;
  }

  getAxis() {
    return this.#axis;
  }

  setAxis(newAxis) {
    this.#axis = newAxis;
    return this;
  }

  #compareArrays(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  /* checks if coords belongs to ship*/
  #findCoord(coords) {
    const position = this.getPositions();
    return position.find((arr) => this.#compareArrays(arr, [...coords, false]));
  }

  getPositions() {
    return this.#position;
  }

  setPositions(coords) {
    this.#position = coords.map((coord) => [...coord, false]);
    return this;
  }

  /* marks ship's coordinate that was hit */
  hit(coords) {
    const position = this.getPositions();
    if (position.some((arr) => this.#compareArrays(arr, [...coords, false]))) {
      this.#findCoord(coords)[2] = true;
      return true;
    }

    return false;
  }

  /* checks if ship's all coordiantes were hit */
  isSunk() {
    return this.getPositions().every((coord) => coord[2] === true);
  }
}

export default Ship;
