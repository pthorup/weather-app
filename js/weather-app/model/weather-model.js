class WeatherModel {
  constructor() {}

  async getCityInfo() {
    const responseCities = await fetch('../../json/cities.json');
    const cityData = await responseCities.json();

    return cityData;
  }

  async getWeatherData(cityID) {
    const apiKey = 'f70f50822fc7d944611cb3493836c135';
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&units=metric&lang=sv&appid=${apiKey}`;

    const responseWeather = await fetch(apiUrl);
    const weatherData = await responseWeather.json();

    return weatherData;
  }
}
