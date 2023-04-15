import format from "date-fns/format";

const dailyForecastCard = (date, condition, maxTemp, minTemp) => {
  const dailyCard = elementCreator("div", "", "daily-forecast-card");

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
  const tempContainer = elementCreator("div", " /", "daily-temps", "text-dim");
  const maxTempEl = elementCreator("span", maxTemp, "max-temp", "text-bright");
  const minTempEl = elementCreator("span", minTemp, "min-temp");

  tempContainer.prepend(maxTempEl);
  tempContainer.append(minTempEl);

  dailyCard.append(dateEl, conditionEl, tempContainer);

  return dailyCard;
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

export default dailyForecastCard;
