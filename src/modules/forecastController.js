import pubsub from "./pubsub";

const ForecastController = () => {
  const apiKey = "ff8edbd483fe40a9960105459230804";

  const getForecast = async (location) => {
    const apiEndPoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=yes&alerts=no`;
    const res = await fetch(apiEndPoint);
    if (res.status === 200) {
      const data = await res.json();
      getCurrentForecast(data);
      getHourlyForecast(data);
      getCurrentAirConditions(data);
      getWeeklyForecast(data);
      return data;
    }
    if (res.status === 400) {
      throw new Error(
        `${location} doesn't exist. Please try a different location.`
      );
    } else {
      throw new Error("Oops something went wrong. Try again please.");
    }
  };

  const getCurrentForecast = (data) => {
    const location = data.location.name;
    const chanceOfRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const dataFiltered = { location, chanceOfRain, temp, condition };

    pubsub.publish("fetchedCurrentWeather", dataFiltered);
    return dataFiltered;
  };

  function getHourlyForecast(data) {
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

    pubsub.publish("fetchedHourlyForecast", filteredHourlyForecast);
    return filteredHourlyForecast;
  }

  const getCurrentAirConditions = (data) => {
    const currentForecast = data.current;
    const feelsLike = currentForecast.feelslike_c;
    const { humidity } = currentForecast;
    const wind = currentForecast.wind_kph;
    const { uv } = currentForecast;
    const airConditionsData = { feelsLike, humidity, wind, uv };

    pubsub.publish("fetchedAirConditions", airConditionsData);
    return airConditionsData;
  };

  const getWeeklyForecast = (data) => {
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

    pubsub.publish("fetchedWeeklyForecast", filteredWeeklyForecast);
    return filteredWeeklyForecast;
  };

  return {
    getForecast,
    getCurrentForecast,
    getHourlyForecast,
    getCurrentAirConditions,
    getWeeklyForecast,
  };
};

const forecastController = ForecastController();

export default forecastController;
