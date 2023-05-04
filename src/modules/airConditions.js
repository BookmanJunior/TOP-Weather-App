import pubsub from "./pubsub";
import elementCreator from "./elementCreator";

const currentAirConditionsCard = () => {
  let forecastData;
  const getCurrentAirConditions = (data) => {
    const currentForecast = data.current;
    const feelsLikeC = currentForecast.feelslike_c;
    const feelsLikeF = currentForecast.feelslike_f;
    const { humidity } = currentForecast;
    const windKph = currentForecast.wind_kph;
    const windMph = currentForecast.wind_mph;
    const { uv } = currentForecast;
    const airConditionsData = {
      feelsLikeC,
      feelsLikeF,
      humidity,
      windKph,
      windMph,
      uv,
    };

    forecastData = airConditionsData;
    return airConditionsData;
  };

  const updateAirCondition = (dataArr) => {
    const realFeelP = document.querySelector(".real-feelP");
    const humidityP = document.querySelector(".humidityP");
    const windP = document.querySelector(".windP");
    const uvP = document.querySelector(".uv-indexP");

    const filteredForecast = getCurrentAirConditions(dataArr);

    realFeelP.textContent = `${filteredForecast.feelsLikeC}°C`;
    humidityP.textContent = `${filteredForecast.humidity}%`;
    windP.textContent = `${filteredForecast.windKph} km/h`;
    uvP.textContent = filteredForecast.uv;
  };

  const render = (realFeel, humidity, wind, uv) => {
    const realFeelP = elementCreator("p", "", "real-feelP");
    const humidityP = elementCreator("p", "", "humidityP");
    const windP = elementCreator("p", "", "windP");
    const uvP = elementCreator("p", "", "uv-indexP");

    realFeel.appendChild(realFeelP);
    humidity.appendChild(humidityP);
    wind.appendChild(windP);
    uv.appendChild(uvP);

    pubsub.sub("fetchedForecast", updateAirCondition);
  };

  function changeUnitsToImperial() {
    const realFeelP = document.querySelector(".real-feelP");
    const windP = document.querySelector(".windP");

    realFeelP.textContent = `${forecastData.feelsLikeF}°F`;
    windP.textContent = `${forecastData.windMph} m/h`;
  }

  function changeUnitsToMetric() {
    const realFeelP = document.querySelector(".real-feelP");
    const windP = document.querySelector(".windP");

    realFeelP.textContent = `${forecastData.feelsLikeC}°C`;
    windP.textContent = `${forecastData.windKph} km/h`;
  }

  pubsub.sub("changeUnitsToImperial", changeUnitsToImperial);
  pubsub.sub("changeUnitsToMetric", changeUnitsToMetric);

  return {
    render,
  };
};

export default currentAirConditionsCard;
