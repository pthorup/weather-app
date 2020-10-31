class WeatherView {
  constructor() {}

  displayIntialLayout() {
    const html = `
    <div class="weather-selectbox-container"></div>
    <div class="weather-selected-city-container">
      <div class="weather-selected-city"></div>
      <div class="weather-selected-city-week"></div>
    <div>`;

    Helper.setHtml('#weather-app', html);
  }

  async displaySelectBox(info) {
    const cityInfo = await info;

    let html = `
      <span>Välj ett städ</span>
      <select name="weather-selectbox" class="weather-selectbox">`;

    cityInfo.forEach((item) => {
      html += `<option data-cityid="${item.weatherCityID}" value="${item.city}">${item.city}</option>`;
    });
    html += `</select>`;

    Helper.setHtml('.weather-selectbox-container', html);
  }

  async displayWeather(info) {
    const weatherData = await info;
    const city = weatherData.city.name;
    const dailyForecast = [];

    for (let i = 0; i < weatherData.list.length; i++) {
      const dayForecast = {};

      // Forecasted date/hour begins according to local time. Hence start hour changes accordingly.
      const forecastedDate = weatherData.list[i].dt_txt;
      const getTimeOnly = forecastedDate.substr(-8);
      if (getTimeOnly === '12:00:00') {
        // Convert unix timestamp to get day name, that is shorten and in swedish
        const day = new Date(weatherData.list[i].dt * 1000).toLocaleString('sv-SE', {
          weekday: 'short',
        });

        dayForecast.day = day;
        dayForecast.time = weatherData.list[i].dt_txt;
        dayForecast.description = weatherData.list[i].weather[0].description;
        dayForecast.icon = weatherData.list[i].weather[0].icon;
        dayForecast.temperature = weatherData.list[i].main.temp.toFixed(0);

        dailyForecast.push(dayForecast);
      }
    }
    console.log(dailyForecast);

    this.displayTodayWeather(city, dailyForecast);
    this.displayDailyWeather(dailyForecast);
  }

  displayTodayWeather(city, dailyForecast) {
    const temp = dailyForecast[0].temperature;
    const desc = dailyForecast[0].description;
    const iconUrl = `http://openweathermap.org/img/wn/${dailyForecast[0].icon}@2x.png`;

    let html = `
    <div class="weather-selected-city-title">${city}</div>
    <div class="weather-selected-city-date">Idag</div>
    <div class="weather-selected-city-temp">${temp}&#176;C</div>
    <img class="weather-selected-city-icon" src="${iconUrl}" alt="${desc}">
    <div class="weather-selected-city-desc">${desc}</div>`;

    Helper.setHtml('.weather-selected-city', html);
  }

  displayDailyWeather(dailyForecast) {
    let day;
    let iconUrl;
    let desc;
    let temp;
    let html = '';

    for (let i = 1; i < dailyForecast.length; i++) {
      day = dailyForecast[i].day;
      iconUrl = `http://openweathermap.org/img/wn/${dailyForecast[i].icon}@4x.png`;
      desc = dailyForecast[i].description;
      temp = dailyForecast[i].temperature;

      html += `
      <div class="weather-selected-city-day">
        <div>${day}</div>
        <img class="weather-selected-city-day-icon" src="${iconUrl}" alt="${desc}">
        <div>${temp}&#176;C</div>
      </div>
      `;
    }

    Helper.setHtml('.weather-selected-city-week', html);
  }
}
