function generateBarcodes() {
  var inputDigits = document.getElementById("inputDigits").value;
  var inputQuantity = document.getElementById("inputQuantity").value;
  var barcodeSvg = document.getElementById("barcodeSvg");

  // Limpar códigos anteriores
  barcodeSvg.innerHTML = "";

  // Remover caracteres não numéricos e garantir que o comprimento seja de 5 dígitos
  inputDigits = inputDigits.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (inputDigits.length !== 5) {
    alert("Digite 5 dígitos válidos do CPF ou CNPJ.");
    return;
  }

  for (var i = 0; i < inputQuantity; i++) {
    var baseCode = "789" + inputDigits;
    var fullCode = baseCode + (i + 1).toString().padStart(4, '0');
    var checkDigit = calculateEAN13CheckDigit(fullCode);
    var barcodeValue = fullCode + checkDigit;

    JsBarcode(barcodeSvg, barcodeValue, {
      format: "EAN13",
      displayValue: true
    });

    barcodeSvg.innerHTML += "<br>";
  }
}

function calculateEAN13CheckDigit(code) {
  // Certifique-se de que o código fornecido tem 12 dígitos
  if (code.length !== 12) {
    throw new Error("O código deve ter exatamente 12 dígitos.");
  }

  // Converte o código em uma matriz de dígitos
  var digits = code.split("").map(Number);

  // Calcula a soma dos dígitos nas posições ímpares
  var oddSum = digits
    .filter(function (_, index) {
      return index % 2 === 0;
    })
    .reduce(function (sum, digit) {
      return sum + digit;
    }, 0);

  // Multiplica a soma por 3
  oddSum *= 3;

  // Calcula a soma dos dígitos nas posições pares
  var evenSum = digits
    .filter(function (_, index) {
      return index % 2 !== 0;
    })
    .reduce(function (sum, digit) {
      return sum + digit;
    }, 0);

  // Calcula a soma total
  var totalSum = oddSum + evenSum;

  // Encontra o próximo múltiplo de 10
  var nextMultipleOfTen = Math.ceil(totalSum / 10) * 10;

  // Calcula o dígito verificador
  var checkDigit = nextMultipleOfTen - totalSum;

  // Retorna o dígito verificador como string
  return checkDigit.toString();
}
