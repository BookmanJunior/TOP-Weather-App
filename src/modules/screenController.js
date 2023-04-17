import forecastController from "./forecastController";
import { dailyForecastCard, hourlyForecastCard } from "./forecastCard";

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
  const hourlyForecastSection = document.querySelector(
    ".hourly-forecast .card-container"
  );
  const weeklyForecastAside = document.querySelector(
    ".weekly-forecast .card-container"
  );

  searchForm.addEventListener("submit", renderData);

  async function renderData(e) {
    e.preventDefault();
    const searchValue = locationSearch.value;
    searchForm.reset();
    resetErrorHandler();

    try {
      const data = await forecastController.getForecast(searchValue);
      console.log(data);
    } catch (err) {
      errorHandler(err.message);
    }
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
