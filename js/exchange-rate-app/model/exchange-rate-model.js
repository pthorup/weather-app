class ExchangeRateModel {
  constructor() {}

  async getCurrencyData() {
    const response = await fetch('../../json/cities.json');
    const cityData = await response.json();
    const cleanedCityData = this.removeDuplicates(cityData);

    const apiKey = '33f35964dfade1391eac9a47';
    const rateReponse = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/SEK`);
    const exchangeRates = await rateReponse.json();

    return {
      cities: cleanedCityData,
      rates: exchangeRates,
    };
  }

  removeDuplicates(data) {
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
