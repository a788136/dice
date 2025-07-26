// const FairRandomGenerator = require('../fair/FairRandomGenerator');
// const readline = require('readline');

// class GameEngine {
//   constructor(diceList) {
//     this.diceList = diceList;
//     this.rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//   }

//   async run() {
//     console.log("Let's determine who makes the first move.");
//     const fair = new FairRandomGenerator(2);
//     console.log(`I selected a random value in the range 0..1 (HMAC=${fair.getHMAC()})`);

//     while (true) {
//       const userChoice = await this.askUser(
//         'Try to guess my selection.\n0 - 0\n1 - 1\nX - exit\n? - help\nYour selection: '
//       );

//       if (userChoice.toLowerCase() === 'x') return this.exit();

//       if (userChoice === '?') {
//         this.showHelpTable();
//         continue;
//       }

//       if (!['0', '1'].includes(userChoice)) {
//         console.log('Invalid selection.');
//         continue;
//       }

//       const reveal = fair.reveal(Number(userChoice));
//       const computerFirst = reveal.result === 1;

//       console.log(`My selection: ${reveal.computerValue} (KEY=${reveal.secretKeyHex})`);
//       console.log(`${computerFirst ? 'I make the first move.' : 'You make the first move.'}`);
//       await this.selectDice(computerFirst);
//       break;
//     }
//   }

//   showHelpTable() {
//     const ProbabilityCalculator = require('../probability/ProbabilityCalculator');
//     const TablePrinter = require('../probability/TablePrinter');
//     const probs = ProbabilityCalculator.calculate(this.diceList);
//     TablePrinter.print(probs, this.diceList);
//   }

//   showFairRollProtocol(facesCount) {
//     const line = '+---+---------------------------+---------------------+';
//     console.log(line);
//     console.log('| # | Computer                  | User                |');
//     console.log(line);
//     console.log('| 1 | Generates a random number |                     |');
//     console.log(`|   | x ∈ {0${facesCount > 1 ? `..${facesCount-1}` : ''}}             |                     |`);
//     console.log(line);
//     console.log('| 2 | Generates a secret key    |                     |');
//     console.log(line);
//     console.log('| 3 | Calculates and displays   |                     |');
//     console.log('|   | HMAC(key).calculate(x)    |                     |');
//     console.log(line);
//     console.log('| 4 |                           | Selects a number    |');
//     console.log(`|   |                           | y ∈ {0${facesCount > 1 ? `..${facesCount-1}` : ''}}       |`);
//     console.log(line);
//     console.log('| 5 | Calculates the result     |                     |');
//     console.log(`|   | (x + y) % ${facesCount}              |                     |`);
//     console.log(line);
//     console.log('| 6 | Shows both the result     |                     |');
//     console.log('|   | and the key               |                     |');
//     console.log(line);
//   }

//   async selectDice(computerFirst) {
//     if (computerFirst) {
//       this.computerDiceIndex = 1;
//       console.log(`I make the first move and choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
//       await this.userChooseDice();
//     } else {
//       await this.userChooseDice();
//       this.computerDiceIndex = this.diceList.findIndex((_, i) => i !== this.userDiceIndex);
//       console.log(`I choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
//     }
//     await this.playRolls();
//   }

//   async userChooseDice() {
//     while (true) {
//       console.log('Choose your dice:');
//       this.diceList.forEach((dice, index) => {
//         if (index !== this.computerDiceIndex) {
//           console.log(`${index} - ${dice.toString()}`);
//         }
//       });
//       console.log('X - exit');
//       console.log('? - help');

//       const answer = await this.askUser('Your selection: ');

//       if (answer.toLowerCase() === 'x') return this.exit();
//       if (answer === '?') {
//         this.showHelpTable();
//         continue;
//       }

//       const index = Number(answer);
//       if (
//         isNaN(index) ||
//         index < 0 ||
//         index >= this.diceList.length ||
//         index === this.computerDiceIndex
//       ) {
//         console.log('Invalid dice selection. Please choose a valid dice number that is not already taken.');
//         continue;
//       }
//       this.userDiceIndex = index;
//       console.log(`You choose the [${this.diceList[this.userDiceIndex].toString()}] dice.`);
//       break;
//     }
//   }

//   async playRolls() {
//     const compRoll = await this.performFairRoll('my', this.diceList[this.computerDiceIndex]);
//     const userRoll = await this.performFairRoll('your', this.diceList[this.userDiceIndex]);

//     console.log(`Your roll result is ${userRoll}.`);
//     console.log(`My roll result is ${compRoll}.`);

//     if (userRoll > compRoll) {
//       console.log('You win!');
//     } else if (userRoll < compRoll) {
//       console.log('I win!');
//     } else {
//       console.log("It's a draw!");
//     }

//     this.rl.close();
//   }

//   async performFairRoll(who, dice) {
//     const facesCount = dice.faces.length || 6;
//     const gen = new FairRandomGenerator(facesCount);

//     const label = who === 'my' ? 'my' : 'your';
//     console.log(`It's time for ${label} roll.`);
//     console.log(`I selected a random value in the range 0..${facesCount - 1} (HMAC=${gen.getHMAC()}).`);
//     console.log(`Add your number modulo ${facesCount}.`);
//     for (let i = 0; i < facesCount; i++) {
//       console.log(`${i} - ${i}`);
//     }
//     console.log('X - exit');
//     console.log('? - help');

//     let userNum;
//     while (true) {
//       const input = await this.askUser('Your selection: ');
//       if (input.toLowerCase() === 'x') return this.exit();
//       if (input === '?') {
//         this.showFairRollProtocol(facesCount); // Показываем ASCII-таблицу протокола!
//         continue;
//       }
//       userNum = Number(input);
//       if (!isNaN(userNum) && userNum >= 0 && userNum < facesCount) break;
//       console.log('Invalid number. Try again.');
//     }

//     const reveal = gen.reveal(userNum);
//     console.log(`My number is ${reveal.computerValue} (KEY=${reveal.secretKeyHex}).`);
//     console.log(`The fair number generation result is ${reveal.computerValue} + ${userNum} = ${reveal.result} (mod ${facesCount}).`);

//     const value = dice.getFace(reveal.result);
//     return value;
//   }

//   askUser(question) {
//     return new Promise(resolve => this.rl.question(question, resolve));
//   }

//   exit() {
//     console.log('Exiting...');
//     this.rl.close();
//     process.exit();
//   }
// }

// module.exports = GameEngine;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const FairRandomGenerator = require('../fair/FairRandomGenerator');
const readline = require('readline');

class GameEngine {
  constructor(diceList) {
    this.diceList = diceList;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async run() {
    console.log("Let's determine who makes the first move.");
    const fair = new FairRandomGenerator(2);
    console.log(`I selected a random value in the range 0..1 (HMAC=${fair.getHMAC()})`);

    while (true) {
      const userChoice = await this.askUser(
        'Try to guess my selection.\n0 - 0\n1 - 1\nX - exit\n? - help\nYour selection: '
      );

      if (userChoice.toLowerCase() === 'x') return this.exit();

      if (userChoice === '?') {
        this.showHelpTable();
        continue;
      }

      if (!['0', '1'].includes(userChoice)) {
        console.log('Invalid selection.');
        continue;
      }

      const reveal = fair.reveal(Number(userChoice));
      const computerFirst = reveal.result === 1;

      console.log(`My selection: ${reveal.computerValue} (KEY=${reveal.secretKeyHex})`);
      console.log(`${computerFirst ? 'I make the first move.' : 'You make the first move.'}`);
      await this.selectDice(computerFirst);
      break;
    }
  }

  showHelpTable() {
    const ProbabilityCalculator = require('../probability/ProbabilityCalculator');
    const TablePrinter = require('../probability/TablePrinter');
    const probs = ProbabilityCalculator.calculate(this.diceList);
    TablePrinter.print(probs, this.diceList);
  }

  showFairRollProtocol(facesCount) {
    const AsciiTable = require('ascii-table');

    const rng = `x ∈ {0${facesCount > 1 ? `..${facesCount-1}` : ''}}`;
    const user = `y ∈ {0${facesCount > 1 ? `..${facesCount-1}` : ''}}`;
    const mod = `(x + y) % ${facesCount}`;

    const steps = [
      ['1',  'Generates a random number',    ''],
      ['',   rng,                            ''],
      ['2',  'Generates a secret key',       ''],
      ['3',  'Calculates and displays',      ''],
      ['',   'HMAC(key).calculate(x)',       ''],
      ['4',  '',                             'Selects a number'],
      ['',   '',                             user],
      ['5',  'Calculates the result',        ''],
      ['',   mod,                            ''],
      ['6',  'Shows both the result',        ''],
      ['',   'and the key',                  '']
    ];

    const table = new AsciiTable('Collaborative Fair Random Protocol');
    table.setHeading('#', 'Computer', 'User');
    steps.forEach(row => table.addRow(...row));

    console.log(table.toString());
  }

  async selectDice(computerFirst) {
    if (computerFirst) {
      this.computerDiceIndex = 1;
      console.log(`I make the first move and choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
      await this.userChooseDice();
    } else {
      await this.userChooseDice();
      this.computerDiceIndex = this.diceList.findIndex((_, i) => i !== this.userDiceIndex);
      console.log(`I choose the [${this.diceList[this.computerDiceIndex].toString()}] dice.`);
    }
    await this.playRolls();
  }

  async userChooseDice() {
    while (true) {
      console.log('Choose your dice:');
      this.diceList.forEach((dice, index) => {
        if (index !== this.computerDiceIndex) {
          console.log(`${index} - ${dice.toString()}`);
        }
      });
      console.log('X - exit');
      console.log('? - help');

      const answer = await this.askUser('Your selection: ');

      if (answer.toLowerCase() === 'x') return this.exit();
      if (answer === '?') {
        this.showHelpTable();
        continue;
      }

      const index = Number(answer);
      if (
        isNaN(index) ||
        index < 0 ||
        index >= this.diceList.length ||
        index === this.computerDiceIndex
      ) {
        console.log('Invalid dice selection. Please choose a valid dice number that is not already taken.');
        continue;
      }
      this.userDiceIndex = index;
      console.log(`You choose the [${this.diceList[this.userDiceIndex].toString()}] dice.`);
      break;
    }
  }

  async playRolls() {
    const compRoll = await this.performFairRoll('my', this.diceList[this.computerDiceIndex]);
    const userRoll = await this.performFairRoll('your', this.diceList[this.userDiceIndex]);

    console.log(`Your roll result is ${userRoll}.`);
    console.log(`My roll result is ${compRoll}.`);

    if (userRoll > compRoll) {
      console.log('You win!');
    } else if (userRoll < compRoll) {
      console.log('I win!');
    } else {
      console.log("It's a draw!");
    }

    this.rl.close();
  }

  async performFairRoll(who, dice) {
    const facesCount = dice.faces.length || 6;
    const gen = new FairRandomGenerator(facesCount);

    const label = who === 'my' ? 'my' : 'your';
    console.log(`It's time for ${label} roll.`);
    console.log(`I selected a random value in the range 0..${facesCount - 1} (HMAC=${gen.getHMAC()}).`);
    console.log(`Add your number modulo ${facesCount}.`);
    for (let i = 0; i < facesCount; i++) {
      console.log(`${i} - ${i}`);
    }
    console.log('X - exit');
    console.log('? - help');

    let userNum;
    while (true) {
      const input = await this.askUser('Your selection: ');
      if (input.toLowerCase() === 'x') return this.exit();
      if (input === '?') {
        this.showFairRollProtocol(facesCount);
        continue;
      }
      userNum = Number(input);
      if (!isNaN(userNum) && userNum >= 0 && userNum < facesCount) break;
      console.log('Invalid number. Try again.');
    }

    const reveal = gen.reveal(userNum);
    console.log(`My number is ${reveal.computerValue} (KEY=${reveal.secretKeyHex}).`);
    console.log(`The fair number generation result is ${reveal.computerValue} + ${userNum} = ${reveal.result} (mod ${facesCount}).`);

    const value = dice.getFace(reveal.result);
    return value;
  }

  askUser(question) {
    return new Promise(resolve => this.rl.question(question, resolve));
  }

  exit() {
    console.log('Exiting...');
    this.rl.close();
    process.exit();
  }
}

module.exports = GameEngine;
