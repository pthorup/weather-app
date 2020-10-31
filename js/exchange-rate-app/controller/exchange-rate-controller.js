class ExchangeRateController {
  constructor(model, view) {
    this.exchangeRateModel = model;
    this.exchangeRateView = view;

    this.displayIntialConverterLayout();
    this.getExchangeRates();
  }

  displayIntialConverterLayout() {
    this.exchangeRateView.displayIntialConverterLayout();
  }

  async getExchangeRates() {
    const currencyData = await this.exchangeRateModel.getCurrencyData();
    this.exchangeRateView.showExchangeList(currencyData);
    this.exchangeRateView.showCurrencyConverter(currencyData);
  }
}
