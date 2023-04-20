import forecastController from "./forecastController";
import pubsub from "./pubsub";

const screenController = () => {
  const searchForm = document.querySelector("form");
  const { locationSearch } = searchForm;
  const error = searchForm.querySelector(".error");
  const currentWeatherSection = document.querySelector(".current-weather");
  const city = currentWeatherSection.querySelector(".city");
  const chanceOfRain = currentWeatherSection.querySelector(
    ".chance-of-rain-perc"
  );
  const currentTemp = currentWeatherSection.querySelector(".temp");
  // const currTempIcon = currentWeatherSection.querySelector(".weather-icon");
  searchForm.addEventListener("submit", renderData);

  async function renderData(e) {
    e.preventDefault();
    const searchValue = locationSearch.value;
    searchForm.reset();
    resetErrorHandler();

    try {
      const data = await forecastController.getForecast(searchValue);
      renderCurrentWeather(data);
      const weeklyForecast = forecastController.getWeeklyForecast(data);
      const hourlyForecast = forecastController.getHourlyForecast(data);
      pubsub.publish("fetchedWeeklyForecast", weeklyForecast);
      pubsub.publish("fetchedHourlyForecast", hourlyForecast);
    } catch (err) {
      errorHandler(err.message);
    }
  }

  function renderCurrentWeather(data) {
    const currentForecast = forecastController.getCurrentForecast(data);
    city.textContent = currentForecast.location;
    chanceOfRain.textContent = `${currentForecast.chanceOfRain}%`;
    currentTemp.textContent = `${currentForecast.temp}C°`;
  }

  function errorHandler(err) {
    error.textContent = err;
    error.dataset.state = "displayed";
    error.setAttribute("aria-hidden", "false");
  }

  function resetErrorHandler() {
    error.textContent = "";
    error.dataset.state = "hidden";
    error.setAttribute("aria-hidden", "true");
  }
};

export default screenController;
