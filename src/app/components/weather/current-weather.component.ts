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
      this.weatherData.main.temp = Math.round(this.weatherData.main.temp);
      this.weatherData.main.feels_like = Math.round(this.weatherData.main.feels_like);
      this.weatherData.wind.speed += 'm/s'
      this.weatherData.main.humidity += '%'
      console.log(this.weatherData);
      // console.log(this.weatherData.list[0].weather[0].icon);
    }, error => console.log(error))
  }


  getWeather() {
    
  }

}
