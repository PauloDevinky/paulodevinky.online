// script.js

document.getElementById("generateButton").addEventListener("click", generateBarcodes);

function generateBarcodes() {
  var inputDigits = document.getElementById("inputDigits").value;
  var inputQuantity = document.getElementById("inputQuantity").value;
  var barcodeOutput = document.getElementById("barcodeOutput");

  // Limpar códigos anteriores
  barcodeOutput.innerHTML = "";

  // Remover caracteres não numéricos e garantir que o comprimento seja de 5 dígitos
  inputDigits = inputDigits.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (inputDigits.length !== 5) {
    alert("Digite 5 dígitos válidos do CPF ou CNPJ.");
    return;
  }

  for (var i = 0; i < inputQuantity; i++) {
    try {
      var barcodeValue = generateEAN13(inputDigits, i);

      // Adicione os códigos gerados ao elemento de saída
      barcodeOutput.innerHTML += barcodeValue + "<br>";
    } catch (error) {
      alert(error.message);
      return;
    }
  }
}
