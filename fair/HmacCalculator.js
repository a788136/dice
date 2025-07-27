const crypto = require('crypto');

class HmacCalculator {
  static calculateHMAC(message, key) {
    return crypto.createHmac('sha3-256', key).update(message.toString()).digest('hex');
  }
}

module.exports = HmacCalculator;
