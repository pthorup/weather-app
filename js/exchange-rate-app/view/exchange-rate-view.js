class ExchangeRateView {
  constructor() {
    this.selectedCurrency;
  }

  displayIntialRateLayout() {
    const html = `
        <div class="currency-table-container">
          <table class="currency-table"></table>
        </div>`;

    Helper.setHtml('#currency-exchange-app', html);
  }

  displayIntialConverterLayout() {
    const html = `
    <div class="currency-converter">
        <h4>Valutaomvandlare</h4>
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
    <div class="currency-table-container" style="display: block">
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

    Helper.setHtml('#currency-exchange-app', html);
  }

  showCurrencyConverter(data) {
    const currencyData = data;
    console.log(currencyData);
    let currency;
    let rate;
    let html;

    html = '';

    for (let i = 0; i < currencyData.cities.length; i++) {
      currency = currencyData.cities[i].currency;
      rate = currencyData.rates.conversion_rates[currency];

      html += `<option value="${rate}">${currency}</option>`;
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

    const selectedToBox = document.querySelector('.currency-converter-select-to');
    const selectedCurrency = selectedToBox.options[selectedToBox.selectedIndex].text;

    const result = ((getValueInput / getValueFrom) * getValueTo).toFixed(2);

    const amount = `${result} ${selectedCurrency}`;

    Helper.setHtml('.currency-result', amount);
  }
}
