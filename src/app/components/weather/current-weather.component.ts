import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/models/current-weather-response';
import { Forecast } from 'src/app/models/forecast';
import { WeatherResponse } from 'src/app/models/response';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { switchMap, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  weatherData: CurrentWeatherResponse | null;

  constructor(private weatherService: WeatherApiService) { }

  ngOnInit(): void {
    this.weatherService.location$.pipe(switchMap(res => this.weatherService.getCurrentWeatherData())).subscribe(res => {
      this.weatherData = res;
      this.weatherService.formatWeatherProperties(this.weatherData.main.temp, this.weatherData.main.feels_like, this.weatherData.wind.speed, this.weatherData.main.humidity);
      this.weatherService.coord$.next({
        lat: this.weatherData.coord.lat,
        lon: this.weatherData.coord.lon
      })
    }, error => console.log(error))
  }

  getWeather() {
    
  }

}