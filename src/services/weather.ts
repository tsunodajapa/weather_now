/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export async function getWeather(city: string) {
  const response = axios.get('http://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: process.env.REACT_APP_API_WEATHER_KEY,
      q: city,
      units: 'metric', // convert in celcius
    },
  });

  return response;
}
