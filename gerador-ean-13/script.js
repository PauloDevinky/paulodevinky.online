function generateBarcodes() {
    var inputDigits = document.getElementById("inputDigits").value;
    var inputQuantity = document.getElementById("inputQuantity").value;
    var barcodeSvg = document.getElementById("barcodeSvg");

    // Limpar códigos anteriores
    barcodeSvg.innerHTML = "";

    // Remover caracteres não numéricos e garantir que o comprimento seja de 12 dígitos
    inputDigits = inputDigits.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (inputDigits.length !== 12) {
        alert("Digite 12 dígitos válidos do CPF ou CNPJ.");
        return;
    }

    // Adicione a verificação se a biblioteca JsBarcode está definida
    if (typeof JsBarcode !== 'undefined') {
        for (var i = 0; i < inputQuantity; i++) {
            // Gere o código EAN-13 adicionando o prefixo "789" e os 12 dígitos fornecidos pelo usuário
            var barcodeValueWithoutCheckDigit = "789" + inputDigits + (i + 1).toString().padStart(4, '0');
            
            // Calcule o 13º dígito usando o algoritmo de cálculo do dígito verificador EAN-13
            var checkDigit = calculateEAN13CheckDigit(barcodeValueWithoutCheckDigit);
            
            // Adicione o 13º dígito ao código completo
            var barcodeValue = barcodeValueWithoutCheckDigit + checkDigit;

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

// Função para calcular o dígito verificador EAN-13
function calculateEAN13CheckDigit(barcodeValue) {
    var sum = 0;
    for (var i = 0; i < barcodeValue.length; i++) {
        var digit = parseInt(barcodeValue[i]);
        sum += i % 2 === 0 ? digit : digit * 3;
    }
    var checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
}

// Adiciona um ouvinte de evento ao botão
document.getElementById("generateButton").addEventListener("click", generateBarcodes);
