const RandomProvider = require('./RandomProvider');
const HmacCalculator = require('./HmacCalculator');

class FairRandomGenerator {
  constructor(maxValueExclusive) {
    this.max = maxValueExclusive;
    this.computerValue = RandomProvider.getRandomInt(this.max);
    this.secretKey = RandomProvider.getRandomKey();
    this.hmac = HmacCalculator.calculateHMAC(this.computerValue, this.secretKey);
  }

  getHMAC() {
    return this.hmac;
  }

  reveal(userValue) {
    const result = (this.computerValue + userValue) % this.max;
    return {
      computerValue: this.computerValue,
      secretKeyHex: this.secretKey.toString('hex'),
      result
    };
  }
}

module.exports = FairRandomGenerator;
