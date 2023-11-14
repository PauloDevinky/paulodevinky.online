// eanGenerator.js

function generateEAN13(inputDigits, index) {
  var baseCode = "789" + inputDigits;
  var fullCode = baseCode + (index + 1).toString().padStart(4, '0');
  var checkDigit = calculateEAN13CheckDigit(fullCode);
  return fullCode + checkDigit;
}

function calculateEAN13CheckDigit(code) {
  if (code.length !== 12) {
    throw new Error("O código deve ter exatamente 12 dígitos.");
  }

  var digits = code.split("").map(Number);

  var oddSum = digits
    .filter(function (_, index) {
      return index % 2 === 0;
    })
    .reduce(function (sum, digit) {
      return sum + digit;
    }, 0);

  oddSum *= 3;

  var evenSum = digits
    .filter(function (_, index) {
      return index % 2 !== 0;
    })
    .reduce(function (sum, digit) {
      return sum + digit;
    }, 0);

  var totalSum = oddSum + evenSum;

  var nextMultipleOfTen = Math.ceil(totalSum / 10) * 10;

  var checkDigit = nextMultipleOfTen - totalSum;

  return checkDigit.toString();
}
