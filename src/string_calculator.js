const { handleCalculatorLogic } = require("./helper_functions.js");

function add(numbersString) {
  return handleCalculatorLogic(numbersString);
}

module.exports = { add };