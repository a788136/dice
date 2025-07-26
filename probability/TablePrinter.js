const AsciiTable = require('ascii-table');

class TablePrinter {
  static print(probabilities, diceList) {
    const table = new AsciiTable('Probability of the win for the user');
    const header = ['User dice v', ...diceList.map(d => d.toString())];
    table.setHeading(...header);

    diceList.forEach((userDice, i) => {
      const row = [userDice.toString()];
      diceList.forEach((compDice, j) => {
        const p = probabilities[i][j];
        row.push(i === j ? '.3333' : p.toFixed(4));
      });
      table.addRow(...row);
    });

    console.log(table.toString());
  }
}

module.exports = TablePrinter;
