const DiceParser = require('./parser/DiceParser');
const GameEngine = require('./game/GameEngine');

const args = process.argv.slice(2);

try {
  const diceList = DiceParser.parse(args);

//   console.log('Successfully parsed dice:');
//   diceList.forEach((dice, i) => {
//     console.log(`Dice ${i}: [${dice.toString()}]`);
//   });


  const engine = new GameEngine(diceList);
  engine.run(); 

} catch (e) {
  console.error('Error:', e.message);
  console.log('\nExample:\nnode index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7');
}
