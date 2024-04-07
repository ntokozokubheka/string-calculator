const { errorMessages, regexObjects } = require("./helper_objects.js");

const handleCalculatorLogic = (inputString) => {
  if (inputString === "" || nullDelimiters(inputString)) {
    return 0;
  } else if (startsWithDoubleSlash(inputString)) {
    throw new Error(errorMessages.errorDelimiterInvalid);
  } else {
    const numbers = handleDelimiterLogic(inputString);

    const negativeNumbers = numbers.filter((number) => number < 0);

    if (negativeNumbers.length > 0) {
      throw new Error(errorMessages.errorNegativeNumbers(negativeNumbers));
    }
    return numbers
      .filter((num) => num.length > 0)
      .reduce((total, current) => parseFloat(total) + parseFloat(current), 0);
  }
};

const handleDelimiterLogic = (value) => {
  const customDelimiterMatch = value.match(regexObjects.delimiterMatch);
  let delimiter = ",";
  let numberString = value;

  if (customDelimiterMatch) {
    delimiter = customDelimiterMatch[1];
    numberString = numberString.slice(customDelimiterMatch[0].length);
  }

  handleInvalidDelimiters(delimiter, numberString);
  const numbers = numberString
    .replaceAll("\n", ",")
    .split(delimiter)
    .filter((str) => {
      const num = Number(str);

      return !isNaN(num);
    });

  return numbers;
};

const handleInvalidDelimiters = (delimiter, value) => {
  if (value.startsWith(delimiter) || value.endsWith(delimiter)) {
    throw new Error(errorMessages.errorDelimiterPosition);
  } else if (regexObjects.regularDigitMatch.test(delimiter)) {
    if (handleIntegerDelimiters(delimiter, value)) {
      throw new Error(errorMessages.errorDelimiterContainsInteger);
    }
  }
};

const handleIntegerDelimiters = (delimiter, inputString) => {
  const targetNumber = delimiter.match(regexObjects.digitMatch);

  if (targetNumber && targetNumber[0].length > 1) {
    const regex = new RegExp(targetNumber[0][0], "g");
    const matches = inputString.match(regex);

    if (matches && matches.length >= 3) {
      return true;
    }
  } else {
    const regex = new RegExp(targetNumber, "g");
    const matches = inputString.match(regex);

    if (matches && matches.length >= 2) {
      return true;
    }
  }

  return false;
};

const nullDelimiters = (inputString) => {
  return (
    regexObjects.findNewLine.test(inputString) &&
    inputString.substring(0, 2) == "//"
  );
};

const startsWithDoubleSlash = (inputString) => {
  if (inputString.length >= 3) {
    const firstFourChars = inputString.substring(0, 3);
    return firstFourChars === "//\n";
  }
  return false;
};
module.exports = { handleCalculatorLogic };