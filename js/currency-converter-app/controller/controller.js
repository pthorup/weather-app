class Controller {
  async getExchangeRates() {
    const completeCountryJSON = await model.getExchangeRates().catch((error) => console.error(error));

    helper.show('.currency-table-container');
    helper.hide('.currency-converter-container');

    view.showRateListHTML(completeCountryJSON);
  }

  async showCurrencyConverter() {
    const completeCountryJSON = await model.getExchangeRates().catch((error) => console.error(error));

    view.showCurrencySelector(completeCountryJSON);
    helper.show('.currency-converter-container');
    helper.hide('.currency-table-container');
  }

  calculateCurrencyChange() {
    model.calculateCurrencyChange();
  }
}
