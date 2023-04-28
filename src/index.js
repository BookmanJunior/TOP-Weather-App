import screenController from "./modules/screenController";
import {
  currentForecastCard,
  airConditionGenerator,
  dailyForecastCardGenerator,
  hourlyForecastCardGenerator,
} from "./modules/forecastCard";

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
currentForecastCard(city, chanceOfRain, currentTemp);
airConditionGenerator.render(realFeel, humidity, wind, uvIndex);
dailyForecastCardGenerator.render(weeklyForecastAside);
hourlyForecastCardGenerator.render(hourlyForecastSection);
