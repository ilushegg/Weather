import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Forecast } from 'src/app/models/forecast';
import { ForecastDaily } from 'src/app/models/forecast-daily';
import { WeatherResponse } from 'src/app/models/response';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  forecastData: WeatherResponse<Forecast[]>;
  forecastDaily: ForecastDaily[];

  constructor(private weatherService: WeatherApiService) { }

  ngOnInit(): void {
    this.weatherService.location$.pipe(switchMap(value => this.weatherService.getForecastData())).subscribe(res => {
      this.forecastData = res;
      console.log(this.forecastData);
    })
  }

  // formatForecastDaily(forecast: Forecast[]) {
  //   console.log(forecast)
  //   let lastDate = new Date(forecast[0].dt_txt).getDate();
  //   for(let i = 0; i < forecast.length; i++) {
  //     let date = new Date(forecast[i].dt_txt).getDate();
  //     let daysForecast: { dt: number; temperature: number; wind: string; humidity: string; feelsLike: number; pressure: number; }[] = [];
  //     if(date === lastDate){
  //       const dayForecast = {
  //         dt: forecast[i].dt,
  //         temperature: forecast[i].main.temp,
  //         wind: forecast[i].wind.speed,
  //         humidity: forecast[i].main.humidity,
  //         feelsLike: forecast[i].main.feels_like,
  //         pressure: forecast[i].main.pressure
  //       }
  //       daysForecast.push(dayForecast);
  //       console.log(daysForecast)

  //     }
  //     else{
  //       let pushForecast = {
  //         day: forecast[i].dt,
  //         main: daysForecast
  //       }
  //       console.log(pushForecast)
  //       lastDate = new Date(forecast[i].dt_txt).getDate();
  //     }
  //   }
    
  }




