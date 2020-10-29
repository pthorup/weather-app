class View {
  showRateListHTML(currencies) {
    const currencyLgth = currencies.length;
    let i;
    let html;

    html = `
        <tr>
          <th>Valuta</th>
          <th>Växlingskurs</th>
        </tr>`;

    for (i = 0; i < currencyLgth; i++) {
      html += `
          <tr>
            <td>
              <img class="currency-table-flag" src="img/${currencies[i].image}" alt="${
        currencies[i].country
      }" />
              <span>${currencies[i].currency}</span>
            </td>
            <td>${currencies[i].rate.toFixed(2)}</td>
          </tr>`;
    }

    helper.setHtml('.currency-table', html);
  }

  showCurrencySelector(currencies) {
    let currencyLgth = currencies.length;
    let i;
    let html;

    html = `<option value="">-- Välj valuta --</option>`;

    console.log(currencies);

    currencies.forEach((currency) => {
      html += `<option value="${currency.currency}">${currency.currency} - ${currency.country}</option>`;
    });

    helper.setHtml('.currency-converter-select-from', html);
    helper.setHtml('.currency-converter-select-to', html);
  }
}
