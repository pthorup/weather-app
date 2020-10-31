class ExchangeRateModel {
  constructor() {}

  async getCurrencyData() {
    const response = await fetch('../../json/cities.json');
    const cityData = await response.json();
    const cleanedCityData = this.removeCurrencyDuplicates(cityData);

    const apiKey = '33f35964dfade1391eac9a47';
    const rateResponse = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/SEK`);
    const exchangeRates = await rateResponse.json();

    return {
      cities: cleanedCityData,
      rates: exchangeRates,
    };
  }

  // Remove any duplicate currencies that shows up in other cities
  removeCurrencyDuplicates(data) {
    const cityData = data;
    let newCurrencyData = [];
    let found;

    for (let i = 0; i < cityData.length; i++) {
      found = newCurrencyData.find((item) => item.currency === cityData[i].currency);

      if (!found) {
        let currencyObj = {};
        currencyObj.currency = cityData[i].currency;
        currencyObj.image = cityData[i].image;
        newCurrencyData.push(currencyObj);
      }
    }
    return newCurrencyData;
  }
}
