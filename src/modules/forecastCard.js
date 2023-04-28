import format from "date-fns/format";
import pubsub from "./pubsub";

const currentForecastCard = (city, rain, temp) => {
  const render = (data) => {
    city.textContent = data.location;
    rain.textContent = `${data.chanceOfRain}%`;
    temp.textContent = `${data.temp}C°`;
  };
  pubsub.sub("fetchedCurrentWeather", render);
};

const currentAirConditionsCard = () => {
  const updateAirCondition = (dataArr) => {
    const realFeelP = document.querySelector(".real-feelP");
    const humidityP = document.querySelector(".humidityP");
    const windP = document.querySelector(".windP");
    const uvP = document.querySelector(".uv-indexP");

    realFeelP.textContent = `${dataArr.feelsLike}C°`;
    humidityP.textContent = dataArr.humidity;
    windP.textContent = `${dataArr.wind} km/h`;
    uvP.textContent = dataArr.uv;
  };

  const render = async (realFeel, humidity, wind, uv) => {
    const realFeelP = elementCreator("p", "", "real-feelP");
    const humidityP = elementCreator("p", "", "humidityP");
    const windP = elementCreator("p", "", "windP");
    const uvP = elementCreator("p", "", "uv-indexP");

    realFeel.appendChild(realFeelP);
    humidity.appendChild(humidityP);
    wind.appendChild(windP);
    uv.appendChild(uvP);

    pubsub.sub("fetchedAirConditions", updateAirCondition);
  };

  return {
    render,
  };
};

const dailyForecastCard = () => {
  const generateDailyCard = (dataArr) => {
    const cardContainer = document.querySelector(
      ".weekly-forecast .card-container"
    );
    cardContainer.textContent = "";
    dataArr.forEach((data) => {
      const card = dailyCardEl(
        data.date,
        data.condition,
        data.maxTemp,
        data.minTemp
      );
      cardContainer.appendChild(card);
    });
  };

  const render = (container) => {
    const cardContainer = elementCreator("div", "", "card-container");
    container.appendChild(cardContainer);

    pubsub.sub("fetchedWeeklyForecast", generateDailyCard);
  };

  function dailyCardEl(date, condition, maxTemp, minTemp) {
    const dailyCard = elementCreator("div", "", "daily-forecast-card", "card");

    const dateEl = elementCreator(
      "p",
      format(new Date(date), "E"),
      "date",
      "text-dim"
    );
    const conditionEl = elementCreator(
      "p",
      condition,
      "weather-condition",
      "text-bright"
    );
    const tempContainer = elementCreator(
      "div",
      " /",
      "daily-temps",
      "text-dim"
    );
    const maxTempEl = elementCreator(
      "span",
      maxTemp,
      "max-temp",
      "text-bright"
    );
    const minTempEl = elementCreator("span", minTemp, "min-temp");

    tempContainer.prepend(maxTempEl);
    tempContainer.append(minTempEl);

    dailyCard.append(dateEl, conditionEl, tempContainer);

    return dailyCard;
  }

  return {
    render,
  };
};

const hourlyForecastCard = () => {
  const generateHourlyCard = (dataArr) => {
    const cardContainer = document.querySelector(
      ".hourly-forecast .card-container"
    );
    cardContainer.textContent = "";
    dataArr.forEach((data) => {
      const card = hourlyCardEl(data.time, data.condition, data.temp);
      cardContainer.appendChild(card);
    });
  };

  const render = (container) => {
    const cardContainer = elementCreator("div", "", "card-container");
    container.appendChild(cardContainer);

    pubsub.sub("fetchedHourlyForecast", generateHourlyCard);
  };

  function hourlyCardEl(time, condition, temp) {
    const hourlyCard = elementCreator(
      "div",
      "",
      "hourly-forecast-card",
      "card"
    );

    const timeEl = elementCreator(
      "p",
      format(new Date(time), "h a"),
      "time",
      "text-dim"
    );
    const conditionEl = elementCreator(
      "p",
      condition,
      "weather-condition",
      "text-bright"
    );
    const tempEl = elementCreator("p", temp, "hourly-temp", "text-bright");

    hourlyCard.append(timeEl, conditionEl, tempEl);

    return hourlyCard;
  }

  return {
    render,
  };
};

const airConditionGenerator = currentAirConditionsCard();
const dailyForecastCardGenerator = dailyForecastCard();
const hourlyForecastCardGenerator = hourlyForecastCard();
export {
  currentForecastCard,
  airConditionGenerator,
  dailyForecastCardGenerator,
  hourlyForecastCardGenerator,
};

function elementCreator(htmlEl, content = "", ...classes) {
  const el = document.createElement(htmlEl);

  el.textContent = content;

  addArrayOfClasses(el, classes);

  return el;
}

function addArrayOfClasses(el, arr) {
  arr.forEach((item) => {
    el.classList.add(item);
  });
}
