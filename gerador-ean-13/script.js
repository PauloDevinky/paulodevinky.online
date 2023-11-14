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

  // Recuperar o último número gerado do localStorage
  var lastGeneratedNumber = parseInt(localStorage.getItem("lastGeneratedNumber")) || 0;

  for (var i = 0; i < inputQuantity; i++) {
    var baseCode = "789" + inputDigits;
    var fullCode = baseCode + (lastGeneratedNumber + 1 + i).toString().padStart(4, '0');
    var checkDigit = calculateEAN13CheckDigit(fullCode);
    var barcodeValue = fullCode + checkDigit;

    JsBarcode(barcodeSvg, barcodeValue, {
      format: "EAN13",
      displayValue: true
    });

    barcodeSvg.innerHTML += "<br>";
  }

  // Atualizar o último número gerado no localStorage
  localStorage.setItem("lastGeneratedNumber", lastGeneratedNumber + inputQuantity);
}

// Função para calcular o dígito verificador do EAN-13
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
