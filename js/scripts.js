document.addEventListener('DOMContentLoaded', function () {
  const WeatherApp = new WeatherController(new WeatherModel(), new WeatherView());
  const ExchangeRate = new ExchangeRateController(new ExchangeRateModel(), new ExchangeRateView());
});
