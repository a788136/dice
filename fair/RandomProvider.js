const crypto = require('crypto');

class RandomProvider {
  static getRandomInt(maxExclusive) {

    const range = 256 - (256 % maxExclusive); 
    let rand;
    do {
      rand = crypto.randomBytes(1)[0];
    } while (rand >= range);
    return rand % maxExclusive;
  }

  static getRandomKey(length = 32) {
    return crypto.randomBytes(length); 
  }
}

module.exports = RandomProvider;
