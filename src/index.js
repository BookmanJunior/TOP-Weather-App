import screenController from "./modules/screenController";
import renderCurrentForecast from "./modules/currentForecast";
import hourlyForecastCard from "./modules/hourlyForecast";
import currentAirConditionsCard from "./modules/airConditions";
import dailyForecastCard from "./modules/weeklyForecast";
import ForecastController from "./modules/forecastController";

const currentWeatherSection = document.querySelector(".current-weather");
const city = currentWeatherSection.querySelector(".city");
const chanceOfRain = currentWeatherSection.querySelector(
  ".chance-of-rain-perc"
);
const currentTemp = currentWeatherSection.querySelector(".temp");
const realFeel = document.querySelector(".real-feel");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const uvIndex = document.querySelector(".uv-index");
const weeklyForecastAside = document.querySelector(".weekly-forecast");
const hourlyForecastSection = document.querySelector(".hourly-forecast");

const app = screenController();
const hourlyForecast = hourlyForecastCard();
const dailyForecast = dailyForecastCard();
const airCondition = currentAirConditionsCard();
const forecastController = ForecastController();

renderCurrentForecast(city, chanceOfRain, currentTemp);
hourlyForecast.render(hourlyForecastSection);
airCondition.render(realFeel, humidity, wind, uvIndex);
dailyForecast.render(weeklyForecastAside);
