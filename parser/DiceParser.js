const Dice = require('../model/Dice');

class DiceParser {
  static parse(argv) {
    if (argv.length < 3) {
      throw new Error('You must specify at least 3 dice. Example: node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7');
    }

    const diceList = argv.map((arg, i) => {
      const parts = arg.split(',');
      if (parts.length < 2) {
        throw new Error(`Dice #${i + 1} must have at least 2 faces.`);
      }

      const numbers = parts.map((s) => {
        const n = Number(s.trim());
        if (!Number.isInteger(n)) {
          throw new Error(`Invalid number in dice #${i + 1}: "${s}"`);
        }
        return n;
      });

      return new Dice(numbers);
    });

    return diceList;
  }
}

module.exports = DiceParser;
