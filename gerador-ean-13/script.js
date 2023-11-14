// script.js

function generateBarcodes() {
  var inputDigits = document.getElementById("inputDigits").value;
  var inputQuantity = document.getElementById("inputQuantity").value;
  var barcodeContainer = document.getElementById("barcodeContainer");

  // Limpar códigos anteriores
  barcodeContainer.innerHTML = "";

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

    // Adicionar cada código gerado ao container
    var barcodeDiv = document.createElement("div");
    barcodeDiv.textContent = barcodeValue;
    barcodeContainer.appendChild(barcodeDiv);
  }

  // Atualizar o último número gerado no localStorage
  localStorage.setItem("lastGeneratedNumber", lastGeneratedNumber + inputQuantity);
}

// Restante do seu script...
