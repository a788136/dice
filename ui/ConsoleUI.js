const ProbabilityCalculator = require('../probability/ProbabilityCalculator');
const TablePrinter = require('../probability/TablePrinter');

class ConsoleUI {
  constructor(diceList) {
    this.diceList = diceList;
  }

  async showMenu() {
    while (true) {
      console.log('\nChoose your dice:');
      this.diceList.forEach((dice, index) => {
        console.log(`${index} - ${dice.toString()}`);
      });
      console.log('X - exit');
      console.log('? - help');

      const input = (await this.getUserInput('Your selection: ')).toUpperCase();

      if (input === 'X') {
        process.stdout.write('Exiting the game. Goodbye!\n', () => {
        process.exit(0);
        });

      }

      if (input === '?') {
        const probs = ProbabilityCalculator.calculate(this.diceList);
        TablePrinter.print(probs, this.diceList);
        continue;
      }

     
      const index = parseInt(input, 10);
      if (isNaN(index) || index < 0 || index >= this.diceList.length) {
        console.log('Invalid selection. Please enter a valid dice number.');
        continue;
      }

      console.log(`You selected dice ${index}: [${this.diceList[index].toString()}]`);

      
      break; 
    }
  }

  getUserInput(promptText) {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) =>
      rl.question(promptText, (answer) => {
        rl.close();
        resolve(answer.trim());
      })
    );
  }
}

module.exports = ConsoleUI;
