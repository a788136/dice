class ProbabilityCalculator {
  /**
   * @param {Dice[]} diceList 
   * @returns {number[][]}
   */
  static calculate(diceList) {
    const n = diceList.length;
    const result = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        result[i][j] = this.#winProbability(diceList[i], diceList[j]);
      }
    }

    return result;
  }

  /**
   * @param {Dice} userDice
   * @param {Dice} compDice
   * @returns {number}
   */
  static #winProbability(userDice, compDice) {
    const userFaces = userDice.faces;
    const compFaces = compDice.faces;
    let wins = 0;
    let total = userFaces.length * compFaces.length;

    for (const u of userFaces) {
      for (const c of compFaces) {
        if (u > c) wins += 1;
        else if (u === c) wins += 0.5;
      }
    }

    return wins / total;
  }
}

module.exports = ProbabilityCalculator;
