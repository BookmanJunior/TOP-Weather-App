import screenController from "./modules/screenController";
import {
  currentForecastCard,
  dailyForecastCardGenerator,
  hourlyForecastCardGenerator,
} from "./modules/forecastCard";

const currentWeatherSection = document.querySelector(".current-weather");
const city = currentWeatherSection.querySelector(".city");
const chanceOfRain = currentWeatherSection.querySelector(
  ".chance-of-rain-perc"
);

const currentTemp = currentWeatherSection.querySelector(".temp");
const weeklyForecastAside = document.querySelector(".weekly-forecast");
const hourlyForecastSection = document.querySelector(".hourly-forecast");

const app = screenController();
currentForecastCard(city, chanceOfRain, currentTemp);
dailyForecastCardGenerator.render(weeklyForecastAside);
hourlyForecastCardGenerator.render(hourlyForecastSection);
