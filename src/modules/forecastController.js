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

  return {
    getForecast,
    getCurrentForecast,
  };
};

const forecastController = ForecastController();

export default forecastController;
