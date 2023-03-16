import { Weather } from "./weather";
import { WeatherMain } from "./weather-main";
import { WeatherWind } from "./weather-wind";


export interface CurrentWeatherResponse  {
  coord: { 
    lon: number,
    lat: number,
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
    sunrise: number,
    sunset: number,
  },
  timezone: string,
  id: string,
  name: string,
  cod: string
}