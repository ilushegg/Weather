import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { Forecast } from 'src/app/models/forecast';
import { ForecastDaily } from 'src/app/models/forecast-daily';
import { WeatherResponse } from 'src/app/models/response';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { WeatherApiService } from 'src/app/services/weather-api/weather-api.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit{

  forecastData: WeatherResponse<Forecast[]> | null;
  forecastDaily: ForecastDaily[] = [];

  constructor(private weatherService: WeatherApiService, private loadingService: SpinnerService) {
    this.loadingService.isLoading$.next(true);
   }

  ngOnInit(): void {
    this.weatherService.location$.pipe(debounceTime(100), switchMap(value => this.weatherService.getForecastData())).subscribe(res => {
      this.forecastData = null;
      this.forecastData = res;
      this.formatForecastDaily(this.forecastData.list);
      debounceTime(500);
      this.loadingService.isLoading$.next(false);
      this.weatherService.currentCity$.next({
        location: this.forecastData.city.name,
        coord: [this.forecastData.city.lat, this.forecastData.city.lon]
      })
    })
  }





  formatForecastDaily(forecast: Forecast[]) {
    this.forecastDaily = [];
    let lastDate = new Date(forecast[0].dt_txt).getDate();
    let daysForecast: { dt_txt: string; description: string; icon: string; temperature: number; wind: string; humidity: string; feelsLike: number; pressure: number; }[] = [];
    for(let i = 0; i < forecast.length; i++) {
      let date = new Date(forecast[i].dt_txt).getDate();
      const dayForecast = {
        dt_txt: forecast[i].dt_txt,
        description: forecast[i].weather[0].description,
        icon: forecast[i].weather[0].icon,
        temperature: forecast[i].main.temp,
        wind: forecast[i].wind.speed,
        humidity: forecast[i].main.humidity,
        feelsLike: forecast[i].main.feels_like,
        pressure: forecast[i].main.pressure,
      }
      let formattedForecastProps = this.weatherService.formatWeatherProperties(dayForecast.temperature, dayForecast.feelsLike, dayForecast.wind, dayForecast.humidity);
      dayForecast.temperature = formattedForecastProps.temp;
      dayForecast.feelsLike = formattedForecastProps.feelsLike;
      dayForecast.wind = formattedForecastProps.windSpeed;
      dayForecast.humidity = formattedForecastProps.humidity;
    
      if(date !== lastDate || i+1 === forecast.length){
        let pushForecast = {
          day: forecast[i-1].dt_txt,
          main: daysForecast
        }
        this.forecastDaily.push(pushForecast);
        lastDate = new Date(forecast[i].dt_txt).getDate();
        daysForecast = [];
      }
      daysForecast.push(dayForecast);
    }
    
  }
}




