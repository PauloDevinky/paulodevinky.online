function generateBarcodes() {
    var inputDigits = document.getElementById("inputDigits").value;
    var inputQuantity = document.getElementById("inputQuantity").value;
    var barcodeSvg = document.getElementById("barcodeSvg");

    // Limpar códigos anteriores
    barcodeSvg.innerHTML = "";

    // Remover caracteres não numéricos e garantir que o comprimento seja de 12 ou 13 dígitos
    inputDigits = inputDigits.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputDigits.length < 12 || inputDigits.length > 13) {
        alert("Digite 12 ou 13 dígitos válidos do CPF ou CNPJ.");
        return;
    }

    // Adicione a verificação se a biblioteca JsBarcode está definida
    if (typeof JsBarcode !== 'undefined') {
        for (var i = 0; i < inputQuantity; i++) {
            // Gere o código EAN-13 usando JsBarcode
            var barcodeValue = inputDigits;

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
