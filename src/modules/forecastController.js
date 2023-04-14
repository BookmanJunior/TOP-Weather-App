const ForecastController = () => {
  const apiKey = "ff8edbd483fe40a9960105459230804";

  const getForecast = async (location) => {
    const apiEndPoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=yes&alerts=no`;
    const res = await fetch(apiEndPoint);
    if (res.status === 200) {
      return res.json();
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

    return { location, chanceOfRain, temp, condition };
  };

  function getHourlyForecast(data) {
    const hourlyForecast = data.forecast.forecastday[0].hour;
    const desiredHours = [6, 9, 12, 13, 18, 21];
    // hourly index correspond to their time
    const filteredHours = hourlyForecast.filter((item, index) =>
      desiredHours.includes(index)
    );
    return filteredHours.reduce((newArr, currItem) => {
      const { time } = currItem;
      const condition = currItem.condition.text;
      const temp = Math.round(currItem.temp_c);
      const hourlyData = { time, condition, temp };
      newArr.push(hourlyData);
      return newArr;
    }, []);
  }

  const getWeeklyForecast = (data) => {
    const weeklyForecast = data.forecast.forecastday;
    return weeklyForecast.reduce((newArr, currItem) => {
      const { date } = currItem;
      const condition = currItem.day.condition.text;
      const maxTemp = Math.round(currItem.day.maxtemp_c);
      const minTemp = Math.round(currItem.day.mintemp_c);
      const dailyData = { date, condition, maxTemp, minTemp };
      newArr.push(dailyData);
      return newArr;
    }, []);
  };

  return {
    getForecast,
    getCurrentForecast,
    getHourlyForecast,
    getWeeklyForecast,
  };
};

const forecastController = ForecastController();

export default forecastController;
