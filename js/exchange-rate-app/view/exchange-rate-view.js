class ExchangeRateView {
  constructor() {
    this.selectedCurrency;
  }

  displayIntialConverterLayout() {
    const html = `
    <div class="currency-converter">
        <h4 class="currency-converter-title">Valutaomvandlare</h4>
            <div class="currency-converter-selectboxes">
              <select class="currency-converter-select-from"></select>
              <span class="currency-converter-select-arrow">&rarr;</span>
              <select class="currency-converter-select-to"></select>
            </div>
            <div class="currency-converter-amount-container">
              <input class="currency-converter-amount" type="text" placeholder="Ange belopp" value="" />
              <div class="currency-result">0.00</div>
            </div>
    </div>`;

    Helper.setHtml('#currency-converter-app', html);
  }

  async showExchangeList(data) {
    const currencyData = data;

    let currency;
    let image;
    let rate;
    let html = `
    <h4 class="currency-table-title">Växlingskurs</h4>
    <div class="currency-table-container">
        <table class="currency-table">
        <tr>
          <th>Valuta</th>
          <th>Priser i SEK</th>
        </tr>`;

    for (let i = 0; i < currencyData.cities.length; i++) {
      image = currencyData.cities[i].image;
      currency = currencyData.cities[i].currency;
      rate = (1 / currencyData.rates.conversion_rates[currency]).toFixed(2);

      html += `
            <tr>
              <td>
                <img class="currency-table-flag" src="img/${image}" alt="${currency}" />
                <span>${currency}</span>
              </td>
              <td>${rate}</td>
            </tr>`;
    }

    Helper.setHtml('#currency-exchange-rate-app', html);
  }

  showCurrencyConverter(data) {
    const currencyData = data;
    let currency;
    let rate;
    let html;

    html = '';

    for (let i = 0; i < currencyData.cities.length; i++) {
      currency = currencyData.cities[i].currency;
      rate = currencyData.rates.conversion_rates[currency];

      html += `<option value="${rate}">${currency}</option>`;

      if (i === 0) {
        document.querySelector('.currency-converter-amount').placeholder = `Ange belopp i ${currency}`;
      }
    }

    Helper.setHtml('.currency-converter-select-from', html);
    Helper.setHtml('.currency-converter-select-to', html);

    Helper.onChange('.currency-converter-select-to', this.calculateCurrency);
    Helper.onChange('.currency-converter-select-from', this.calculateCurrency);
    Helper.onInput('.currency-converter-amount', this.calculateCurrency);
  }

  calculateCurrency() {
    const getValueFrom = Helper.getValue('.currency-converter-select-from');
    const getValueTo = Helper.getValue('.currency-converter-select-to');
    const getValueInput = Helper.getValue('.currency-converter-amount');

    const selectedFromBox = document.querySelector('.currency-converter-select-from');
    const selectedFromCurrency = selectedFromBox.options[selectedFromBox.selectedIndex].text;
    document.querySelector(
      '.currency-converter-amount',
    ).placeholder = `Ange belopp i ${selectedFromCurrency}`;

    const selectedToBox = document.querySelector('.currency-converter-select-to');
    const selectedToCurrency = selectedToBox.options[selectedToBox.selectedIndex].text;
    const result = ((getValueInput / getValueFrom) * getValueTo).toFixed(2);

    const amount = `= ${result} <span class="currency-converter-amount-currency">${selectedToCurrency}</span>`;

    Helper.setHtml('.currency-result', amount);
  }
}
