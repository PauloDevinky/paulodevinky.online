function generateBarcodes() {
    var inputDigits = document.getElementById("inputDigits").value;
    var inputQuantity = document.getElementById("inputQuantity").value;
    var barcodeSvg = document.getElementById("barcodeSvg");

    // Limpar códigos anteriores
    barcodeSvg.innerHTML = "";

    if (!/^\d{5}$/.test(inputDigits)) {
        alert("Digite 5 dígitos válidos do CPF ou CNPJ.");
        return;
    }

    // Adicione a verificação se a biblioteca JsBarcode está definida
    if (typeof JsBarcode !== 'undefined') {
        for (var i = 0; i < inputQuantity; i++) {
            // Gere o código EAN-13 usando JsBarcode
            var barcodeValue = inputDigits + i;

            JsBarcode(barcodeSvg, barcodeValue, {
                format: "EAN13",
                displayValue: true
            });

            // Adicione uma quebra de linha para códigos múltiplos
            barcodeSvg.innerHTML += "<br>";
        }
    } else {
        alert("Erro: A biblioteca JsBarcode não está carregada corretamente.");
    }
}

// Adiciona um ouvinte de evento ao botão
document.getElementById("generateButton").addEventListener("click", generateBarcodes);
