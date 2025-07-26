const crypto = require('crypto');

class RandomProvider {
  static getRandomInt(maxExclusive) {
    // Без смещений — честная генерация
    const range = 256 - (256 % maxExclusive); // ближайшее кратное
    let rand;
    do {
      rand = crypto.randomBytes(1)[0];
    } while (rand >= range);
    return rand % maxExclusive;
  }

  static getRandomKey(length = 32) {
    return crypto.randomBytes(length); // по умолчанию 256 бит = 32 байта
  }
}

module.exports = RandomProvider;
