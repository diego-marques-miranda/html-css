document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const firstquantity = document.getElementById('firstquantity');

    const apiKey = 'a1df859ce0ae9f6deb0688e1';
    const apiUrl = 'https://v6.exchangerate-api.com/v6/a1df859ce0ae9f6deb0688e1/latest/USD';


    function loadCurrencies() {
        fetch('apiUrl') 
            .then(response => response.json())
            .then(data => {
                console.log('Dados da API:', data);
                const currencies = Object.keys(data.rates);
                currencies.forEach(currency => {
                    const option = document.createElement('option');
                    option.value = currency;
                    option.textContent = currency;
                    fromCurrency.appendChild(option);
                    toCurrency.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => console.error('Erro ao carregar as moedas:', error));
    }


    function AtualizacaoResultado() {
        const firstquantity = document.getElementById("firstquantity").value;
        const fromCurrency = document.getElementById("firstoptions").value;
        const toCurrency = document.getElementById("secondoptions").value;
        let secondquantity;

        secondquantity = ConversaoGeral(fromCurrency, toCurrency, firstquantity);

        document.getElementById('result').textContent = toCurrency + " " + secondquantity;
    }


    function ConversaoGeral(fromCurrency, toCurrency, firstquantity) {
        let secondquantity;
        let aux;

        if (fromCurrency == toCurrency) {
            secondquantity = firstquantity; // If same currency same quantity

        } else if (fromCurrency == 'USD') {
            secondquantity = firstquantity * taxes[secondc]; // If first currency is USD then multiply by fq second currency tax

        } else if (toCurrency == 'USD') {
            secondquantity = firstquantity / taxes[firstc]; // If second currency is USD then divide fq by first currecny tax

        } else if (fromCurrency != 'USD' && toCurrency != 'USD'){
            aux = firstquantity / taxes[fromCurrency];    
            secondquantity = aux * taxes[toCurrency]; // If none currency is USD, then convert first quantity into USD and  then to second currency

        }

        secondquantity = Math.floor(secondquantity * 100) / 100;

        return secondquantity;
    }

    document.getElementById("firstquantity").addEventListener('input', AtualizacaoResultado);
    document.getElementById("fromCurrency").addEventListener('change', AtualizacaoResultado);
    document.getElementById("toCurrency").addEventListener('change', AtualizacaoResultado);

    loadCurrencies();
});