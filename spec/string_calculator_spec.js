const { add } = require("../src/string_calculator.js");
const { errorMessages } = require("../src/helper_objects.js");
describe("add function", () => {
  it("should return 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("should handle default delimiter (comma) and sum numbers", () => {
    expect(add("1,2,3")).toBe(6);
  });

  it("should handle custom delimiter (***)", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });

  it("should handle custom delimiter (;)", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  it("should throw an error for negative numbers", () => {
    expect(() => add("1,-2,3,4")).toThrowError(
      errorMessages.errorNegativeNumbers([-2])
    );
  });

  it("should handle a custom delimiter containing integers", () => {
    expect(add("//4\n142")).toBe(3);
  });

  it("should handle a custom delimiter at the start", () => {
    expect(() => add("//4\n434243")).toThrowError(
      errorMessages.errorDelimiterPosition
    );
  });

  it("should throw an error where the delimiter and the digit that are added are next to each other", () => {
    expect(() => add("//88\n18883")).toThrowError(
      errorMessages.errorDelimiterContainsInteger
    );
  });

  it("should throw an error where the delimiter is invalid", () => {
    expect(() => add("//\n123")).toThrowError(
      errorMessages.errorDelimiterInvalid
    );
  });

  it("should return zero for an empty entry on the value being separated by the delimiter", () => {
    expect(add("//*\n")).toBe(0);
  });

  it("should handle a delimiter of any length", () => {
    expect(add("//***\n1***2***3")).toEqual(6);
  });
});