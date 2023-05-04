import format from "date-fns/format";
import pubsub from "./pubsub";
import elementCreator from "./elementCreator";

const dailyForecastCard = () => {
  let forecastData;

  const filterWeeklyForecast = (data) => {
    const weeklyForecast = data.forecast.forecastday;
    const filteredWeeklyForecast = weeklyForecast.reduce((newArr, currItem) => {
      const { date } = currItem;
      const condition = currItem.day.condition.text;
      const maxTempC = Math.round(currItem.day.maxtemp_c);
      const minTempC = Math.round(currItem.day.mintemp_c);
      const maxTempF = Math.round(currItem.day.maxtemp_f);
      const minTempF = Math.round(currItem.day.mintemp_f);
      const dailyData = {
        date,
        condition,
        maxTempC,
        minTempC,
        maxTempF,
        minTempF,
      };
      newArr.push(dailyData);
      return newArr;
    }, []);

    forecastData = filteredWeeklyForecast;
    return filteredWeeklyForecast;
  };

  const generateDailyCard = (dataArr) => {
    const cardContainer = document.querySelector(
      ".weekly-forecast .card-container"
    );
    cardContainer.textContent = "";

    const filteredForecast = filterWeeklyForecast(dataArr);
    filteredForecast.forEach((data) => {
      const card = dailyCardEl(
        data.date,
        data.condition,
        data.maxTempC,
        data.minTempC
      );
      cardContainer.appendChild(card);
    });
  };

  const render = (container) => {
    const cardContainer = elementCreator("div", "", "card-container");
    container.appendChild(cardContainer);

    pubsub.sub("fetchedForecast", generateDailyCard);
  };

  function changeUnitsToImperial() {
    const maxTemps = document.querySelectorAll(".max-temp");
    const minTemps = document.querySelectorAll(".min-temp");

    maxTemps.forEach((maxTemp, index) => {
      maxTemp.textContent = `${forecastData[index].maxTempF}`;
    });
    minTemps.forEach((minTemp, index) => {
      minTemp.textContent = `${forecastData[index].minTempF}°F`;
    });
  }

  function changeUnitsToMetric() {
    const maxTemps = document.querySelectorAll(".max-temp");
    const minTemps = document.querySelectorAll(".min-temp");

    maxTemps.forEach((maxTemp, index) => {
      maxTemp.textContent = `${forecastData[index].maxTempC}`;
    });
    minTemps.forEach((minTemp, index) => {
      minTemp.textContent = `${forecastData[index].minTempC}°C`;
    });
  }

  pubsub.sub("changeUnitsToImperial", changeUnitsToImperial);
  pubsub.sub("changeUnitsToMetric", changeUnitsToMetric);

  return {
    render,
  };

  function dailyCardEl(date, condition, maxTempC, minTempC) {
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
      maxTempC,
      "max-temp",
      "text-bright"
    );
    const minTempEl = elementCreator("span", `${minTempC}°C`, "min-temp");

    tempContainer.prepend(maxTempEl);
    tempContainer.append(minTempEl);

    dailyCard.append(dateEl, conditionEl, tempContainer);

    return dailyCard;
  }
};

export default dailyForecastCard;
