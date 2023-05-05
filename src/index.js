import screenController from "./modules/screenController";
import renderCurrentForecast from "./modules/currentForecast";
import hourlyForecastCard from "./modules/hourlyForecast";
import currentAirConditionsCard from "./modules/airConditions";
import dailyForecastCard from "./modules/weeklyForecast";
import ForecastController from "./modules/forecastController";
import localStorageController from "./modules/localStorage";

const currentWeatherSection = document.querySelector(".current-weather");
const currentWeatherTopContainer = currentWeatherSection.querySelector(
  ".current-weather-top"
);
const currentWeatherBottomContainer = currentWeatherSection.querySelector(
  ".current-weather-bottom"
);
const realFeel = document.querySelector(".real-feel");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const uvIndex = document.querySelector(".uv-index");
const weeklyForecastAside = document.querySelector(".weekly-forecast");
const hourlyForecastSection = document.querySelector(".hourly-forecast");

const app = screenController();
const currentForecast = renderCurrentForecast();
const hourlyForecast = hourlyForecastCard();
const dailyForecast = dailyForecastCard();
const airCondition = currentAirConditionsCard();
const forecastController = ForecastController();
const lStorage = localStorageController();

window.addEventListener("load", () => {
  forecastController.getForecast(lStorage.loadDefaultLocation());
});

currentForecast.render(
  currentWeatherTopContainer,
  currentWeatherTopContainer,
  currentWeatherBottomContainer
);
hourlyForecast.render(hourlyForecastSection);
airCondition.render(realFeel, humidity, wind, uvIndex);
dailyForecast.render(weeklyForecastAside);
