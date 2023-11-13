function loadJsBarcode(callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// Quando a biblioteca estiver carregada, chame a função principal
loadJsBarcode(function() {
    // Função principal que gera os códigos
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

        for (var i = 0; i < inputQuantity; i++) {
            // Gere o código EAN-13 usando JsBarcode
            var barcodeValue = inputDigits + i;
            JsBarcode(barcodeSvg, barcodeValue, {
                format: "EAN13",
                displayValue: true,
            });

            // Adicione uma quebra de linha para códigos múltiplos
            barcodeSvg.innerHTML += "<br>";
        }
    }
});
