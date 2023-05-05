import elementCreator from "./elementCreator";
import pubsub from "./pubsub";

const renderCurrentForecast = () => {
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

  const updateCurrentWeather = (dataArr) => {
    const city = document.querySelector(".city");
    const rain = document.querySelector(".chance-of-rain");
    const temp = document.querySelector(".temp");

    const data = filterForecastData(dataArr);

    city.textContent = data.location;
    rain.textContent = `Chance of rain: ${data.chanceOfRain}%`;
    temp.textContent = `${data.tempC}°C`;
  };

  function render(cityContainer, rainContainer, tempContainer) {
    const cityEl = elementCreator("p", "", "city", "text-bright");
    const rainEl = elementCreator("p", "", "chance-of-rain", "text-dim");
    const tempEl = elementCreator("p", "", "temp", "text-bright");

    cityContainer.appendChild(cityEl);
    rainContainer.appendChild(rainEl);
    tempContainer.appendChild(tempEl);

    pubsub.sub("fetchedForecast", updateCurrentWeather);
  }

  function changeUnitsToImperial() {
    const currTemp = document.querySelector(".temp");
    currTemp.textContent = `${forecastData.tempF}°F`;
  }

  function changeUnitsToMetric() {
    const currTemp = document.querySelector(".temp");
    currTemp.textContent = `${forecastData.tempC}°C`;
  }

  pubsub.sub("changeUnitsToImperial", changeUnitsToImperial);
  pubsub.sub("changeUnitsToMetric", changeUnitsToMetric);

  return {
    render,
  };
};

export default renderCurrentForecast;
