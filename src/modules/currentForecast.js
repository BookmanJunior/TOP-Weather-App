import pubsub from "./pubsub";

const renderCurrentForecast = (city, rain, temp) => {
  const filterForecastData = (data) => {
    const location = data.location.name;
    const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const condition = data.current.condition.text;
    const filteredData = { location, chanceOfRain, tempC, tempF, condition };
    return filteredData;
  };

  function render(data) {
    const forecastData = filterForecastData(data);
    city.textContent = forecastData.location;
    rain.textContent = `${forecastData.chanceOfRain}%`;
    temp.textContent = `${forecastData.tempC}°C`;
  }

  pubsub.sub("fetchedForecast", render);
};

export default renderCurrentForecast;
