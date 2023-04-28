import format from "date-fns/format";
import pubsub from "./pubsub";
import elementCreator from "./elementCreator";

const hourlyForecastCard = () => {
  function filterForecastData(data) {
    const hourlyForecast = data.forecast.forecastday[0].hour;
    const desiredHours = [6, 9, 12, 13, 18, 21];
    // hourly index correspond to their time
    const filteredHours = hourlyForecast.filter((item, index) =>
      desiredHours.includes(index)
    );
    const filteredHourlyForecast = filteredHours.reduce((newArr, currItem) => {
      const { time } = currItem;
      const condition = currItem.condition.text;
      const temp = Math.round(currItem.temp_c);
      const hourlyData = { time, condition, temp };
      newArr.push(hourlyData);
      return newArr;
    }, []);
    return filteredHourlyForecast;
  }

  const generateHourlyCard = (dataArr) => {
    const filteredForecastData = filterForecastData(dataArr);
    const cardContainer = document.querySelector(
      ".hourly-forecast .card-container"
    );
    cardContainer.textContent = "";
    filteredForecastData.forEach((data) => {
      const card = hourlyCardEl(data.time, data.condition, data.temp);
      cardContainer.appendChild(card);
    });
  };

  const render = (container) => {
    const cardContainer = elementCreator("div", "", "card-container");
    container.appendChild(cardContainer);

    pubsub.sub("fetchedForecast", generateHourlyCard);
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

export default hourlyForecastCard;
