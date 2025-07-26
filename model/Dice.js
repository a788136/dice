class Dice {
  constructor(faces) {
    if (!Array.isArray(faces) || faces.length === 0) {
      throw new Error('Dice must have at least one face');
    }
    this.faces = faces;
  }

  getFace(index) {
    return this.faces[index];
  }

  size() {
    return this.faces.length;
  }

  toString() {
    return this.faces.join(',');
  }
}

module.exports = Dice;
