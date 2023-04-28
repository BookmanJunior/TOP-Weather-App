import format from "date-fns/format";
import pubsub from "./pubsub";
import elementCreator from "./elementCreator";

const dailyForecastCard = () => {
  const filterWeeklyForecast = (data) => {
    const weeklyForecast = data.forecast.forecastday;
    const filteredWeeklyForecast = weeklyForecast.reduce((newArr, currItem) => {
      const { date } = currItem;
      const condition = currItem.day.condition.text;
      const maxTemp = Math.round(currItem.day.maxtemp_c);
      const minTemp = Math.round(currItem.day.mintemp_c);
      const dailyData = { date, condition, maxTemp, minTemp };
      newArr.push(dailyData);
      return newArr;
    }, []);

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
        data.maxTemp,
        data.minTemp
      );
      cardContainer.appendChild(card);
    });
  };

  const render = (container) => {
    const cardContainer = elementCreator("div", "", "card-container");
    container.appendChild(cardContainer);

    pubsub.sub("fetchedForecast", generateDailyCard);
  };

  return {
    render,
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
    const minTempEl = elementCreator("span", `${minTemp}°C`, "min-temp");

    tempContainer.prepend(maxTempEl);
    tempContainer.append(minTempEl);

    dailyCard.append(dateEl, conditionEl, tempContainer);

    return dailyCard;
  }
};

export default dailyForecastCard;
