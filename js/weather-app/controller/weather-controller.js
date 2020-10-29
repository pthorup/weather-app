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
    let cityID;
    const cityInfo = await this.weatherModel.getCityInfo();
    await this.weatherView.displaySelectBox(cityInfo);

    const element = document.querySelector('.weather-selectbox');

    // Display a default weather of first city
    cityID = element.selectedOptions[0].getAttribute('data-cityid');
    this.displayWeather(cityID);

    element.addEventListener('change', (event) => {
      cityID = event.target.selectedOptions[0].getAttribute('data-cityid');
      this.displayWeather(cityID);
    });
  }

  displayWeather(cityID) {
    const weatherData = this.weatherModel.getWeatherData(cityID);
    this.weatherView.displayWeather(weatherData);
  }
}
