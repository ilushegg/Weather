import { City } from "./city";
import { Forecast } from "./forecast";

export interface WeatherResponse<T> {
  city: City,
  cnt: number,
  cod: number,
  list: T,
}
