import screenController from "./modules/screenController";
import {
  dailyForecastCardGenerator,
  hourlyForecastCardGenerator,
} from "./modules/forecastCard";

const weeklyForecastAside = document.querySelector(".weekly-forecast");
const hourlyForecastSection = document.querySelector(".hourly-forecast");

const app = screenController();
dailyForecastCardGenerator.render(weeklyForecastAside);
hourlyForecastCardGenerator.render(hourlyForecastSection);
