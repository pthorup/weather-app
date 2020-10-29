class Model {
  async getAllData() {
    const exchangerateAPIUrl = 'https://v6.exchangerate-api.com/v6/33f35964dfade1391eac9a47/latest/SEK';
    const countriesURL = 'js/json/countries.json';

    const responseForExchange = await fetch(exchangerateAPIUrl);
    const exchangeRates = await responseForExchange.json();

    const responseForCountries = await fetch(countriesURL);
    const countries = await responseForCountries.json();

    // Save both data in an object and return
    return {
      countries: countries,
      rates: exchangeRates,
    };
  }

  async getExchangeRates() {
    const allData = await this.getAllData();
    const countries = allData.countries;

    countries.forEach((country, index) => {
      // Get the country's currency abbreviation code
      const currency = country.currency;
      // Use the abbreviation code to find the conversion rate and save in countries object
      countries[index].rate = 1 / allData.rates.conversion_rates[currency];
    });
    return countries;
  }

  async calculateCurrencyChange() {
    const getValueFrom = helper.getValue('.currency-converter-select-from');
    const getValueTo = helper.getValue('.currency-converter-select-to');
    const getValueInput = helper.getValue('.currency-converter-amount');

    const currencies = await this.getAllData();

    const rateFrom = currencies.rates.conversion_rates[getValueFrom];
    const rateTo = currencies.rates.conversion_rates[getValueTo];

    const result = ((getValueInput / rateFrom) * rateTo).toFixed(2);

    helper.setHtml('.currency-result', result);
  }
}
