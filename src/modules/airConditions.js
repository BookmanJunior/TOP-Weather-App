import pubsub from "./pubsub";
import elementCreator from "./forecastCard";

const currentAirConditionsCard = () => {
  const getCurrentAirConditions = (data) => {
    const currentForecast = data.current;
    const feelsLike = currentForecast.feelslike_c;
    const { humidity } = currentForecast;
    const wind = currentForecast.wind_kph;
    const { uv } = currentForecast;
    const airConditionsData = { feelsLike, humidity, wind, uv };

    return airConditionsData;
  };

  const updateAirCondition = (dataArr) => {
    const realFeelP = document.querySelector(".real-feelP");
    const humidityP = document.querySelector(".humidityP");
    const windP = document.querySelector(".windP");
    const uvP = document.querySelector(".uv-indexP");

    const filteredForecast = getCurrentAirConditions(dataArr);

    realFeelP.textContent = `${filteredForecast.feelsLike}C°`;
    humidityP.textContent = filteredForecast.humidity;
    windP.textContent = `${filteredForecast.wind} km/h`;
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

  return {
    render,
  };
};

export default currentAirConditionsCard;
