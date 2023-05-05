import pubsub from "./pubsub";

const ForecastController = () => {
  const apiKey = "ff8edbd483fe40a9960105459230804";

  const error = document.querySelector(".error");
  const loader = document.querySelector(".loader-container");

  const getForecast = async (location) => {
    resetErrorHandler();
    loader.dataset.state = "displayed";
    try {
      const response = await Promise.race([
        fetchRequest(location),
        fetchTimeOut(5),
      ]);
      pubsub.publish("fetchedForecast", response);
    } catch (err) {
      errorHandler(err);
    } finally {
      loader.dataset.state = "hidden";
    }
  };

  async function fetchRequest(location) {
    const apiEndPoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=yes&alerts=no`;
    const res = await fetch(apiEndPoint, { mode: "cors" });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    if (res.status === 400) {
      throw new Error(
        `${location} doesn't exist. Please try a different location.`
      );
    } else {
      throw new Error("Oops something went wrong. Try again please.");
    }
  }

  function fetchTimeOut(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timeout"));
      }, time * 1000);
    });
  }

  pubsub.sub("search", getForecast);

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

  return {
    getForecast,
  };
};

export default ForecastController;
