export interface ForecastDaily {
  day: string,
  main: {
    dt_txt: string,
    description: string,
    icon: string,
    temperature: number,
    wind: string,
    humidity: string,
    feelsLike: number,
    pressure: number,

  }[]
}