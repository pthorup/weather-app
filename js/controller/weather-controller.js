class WeatherController {
  constructor(WeatherModel, WeatherView) {
    this.weatherModel = WeatherModel;
    this.weatherView = WeatherView;

    this.displayIntialLayout();
    this.displaySelectBox();
  }

  displayIntialLayout() {
    this.weatherView.displayIntialLayout();
  }

  async displaySelectBox() {
    const cityInfo = await this.weatherModel.getCityInfo();
    await this.weatherView.displaySelectBox(cityInfo);

    // Get first city info to set as default and display weather
    const element = document.querySelector('.weather-selectbox');
    let cityID = element.selectedOptions[0].getAttribute('data-cityid');
    let city = element.selectedOptions[0].getAttribute('data-city');
    let country = element.selectedOptions[0].getAttribute('data-country');
    this.displayWeather(cityID, city, country);

    // Get selected city info on change in selectbox
    element.addEventListener('change', (event) => {
      cityID = event.target.selectedOptions[0].getAttribute('data-cityid');
      city = event.target.selectedOptions[0].getAttribute('data-city');
      country = event.target.selectedOptions[0].getAttribute('data-country');
      this.displayWeather(cityID, city, country);
    });
  }

  displayWeather(cityID, city, country) {
    const weatherData = this.weatherModel.getWeatherData(cityID);
    this.weatherView.displayWeather(weatherData, city, country);
  }
}
