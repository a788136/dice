const DiceParser = require('./parser/DiceParser');

test('parses valid dice', () => {
  const args = ['2,2,4,4,9,9', '1,1,6,6,8,8', '3,3,5,5,7,7'];
  const diceList = DiceParser.parse(args);

  expect(diceList.length).toBe(3);
  expect(diceList[0].faces).toEqual([2, 2, 4, 4, 9, 9]);
});
