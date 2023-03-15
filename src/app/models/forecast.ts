import { Weather } from "./weather";
import { WeatherMain } from "./weather-main";
import { WeatherWind } from "./weather-wind";

export interface Forecast {
  clouds: number,
  dt: number,
  dt_txt: string,
  main: WeatherMain,
  pop: number,
  visibility: number,
  weather: Weather[],
  wind: WeatherWind,
  sunrise: string,
  sunset: string
}
