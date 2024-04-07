const errorMessages = {
  errorNegativeNumbers: function (value) {
    return `negatives not allowed ${value.join(",")}`;
  },
  errorNotNumber: function (value) {
    return `Invalid input: '${value}' is not a valid number.`;
  },
  errorDelimiterContainsInteger:
    "The delimiter and the digit you are adding are next to each other",
  errorDelimiterPosition:
    "The delimiter is at the start and/or end of the list of integers",
  errorDelimiterInvalid: "The delimiter is invalid",
};

const regexObjects = {
  delimiterMatch: /^\/\/(.+?)\n/,
  regularDigitMatch: /\d/,
  digitMatch: /\d+/g,
  findNewLine: /\n$/,
};

module.exports = { errorMessages, regexObjects };