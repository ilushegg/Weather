import { Weather } from "./weather";
import { WeatherMain } from "./weather-main";
import { WeatherWind } from "./weather-wind";


export interface CurrentWeatherResponse  {
  coord: { 
    lon: string,
    lat: string,
  },
  weather: Weather[],
  main: WeatherMain,
  visibility: string,
  wind: WeatherWind,
  rain: { 
    '1h': number,
  },
  // clouds: {
  //   all: number,
  // }
  dt: number,
  sys: {
    id: string,
    country: string,
    sunrise: string,
    sunset: string,
  },
  timezone: string,
  id: string,
  name: string,
  cod: string
}