import forecastController from "./forecastController";

const screenController = () => {
  const searchForm = document.querySelector("form");
  const { locationSearch } = searchForm;
  const error = searchForm.querySelector(".error");
  const loader = document.querySelector(".loader-container");
  // const currTempIcon = currentWeatherSection.querySelector(".weather-icon");
  searchForm.addEventListener("submit", renderData);

  async function renderData(e) {
    e.preventDefault();
    const searchValue = locationSearch.value;
    searchForm.reset();
    resetErrorHandler();
    loader.dataset.state = "displayed";

    try {
      await forecastController.getForecast(searchValue);
    } catch (err) {
      errorHandler(err.message);
    } finally {
      loader.dataset.state = "hidden";
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
