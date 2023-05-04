import pubsub from "./pubsub";

const renderCurrentForecast = (city, rain, temp) => {
  let forecastData;

  const filterForecastData = (data) => {
    const location = data.location.name;
    const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const condition = data.current.condition.text;
    const filteredData = { location, chanceOfRain, tempC, tempF, condition };
    forecastData = filteredData;
    return filteredData;
  };

  function render(data) {
    const currForecast = filterForecastData(data);
    city.textContent = currForecast.location;
    rain.textContent = `${currForecast.chanceOfRain}%`;
    temp.textContent = `${currForecast.tempC}°C`;
  }

  function changeUnitsToImperial() {
    temp.textContent = `${forecastData.tempF}°F`;
  }

  function changeUnitsToMetric() {
    temp.textContent = `${forecastData.tempC}°C`;
  }

  pubsub.sub("fetchedForecast", render);
  pubsub.sub("changeUnitsToImperial", changeUnitsToImperial);
  pubsub.sub("changeUnitsToMetric", changeUnitsToMetric);
};

export default renderCurrentForecast;
