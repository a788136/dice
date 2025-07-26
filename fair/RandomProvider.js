const crypto = require('crypto');

class RandomProvider {
  static getRandomInt(maxExclusive) {
    // Только встроенный криптостойкий способ!
    return crypto.randomInt(0, maxExclusive);
  }

  static getRandomKey(length = 32) {
    // 256 бит (32 байта) по умолчанию
    return crypto.randomBytes(length);
  }
}

module.exports = RandomProvider;




//RandomProvider.js

// const crypto = require('crypto');

// class RandomProvider {
//   static getRandomInt(maxExclusive) {

//     const range = 256 - (256 % maxExclusive); 
//     let rand;
//     do {
//       rand = crypto.randomBytes(1)[0];
//     } while (rand >= range);
//     return rand % maxExclusive;
//   }

//   static getRandomKey(length = 32) {
//     return crypto.randomBytes(length); 
//   }
// }

// module.exports = RandomProvider;