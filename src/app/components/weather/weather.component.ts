import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/models/current-weather-response';
import { Forecast } from 'src/app/models/forecast';
import { WeatherResponse } from 'src/app/models/response';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherData: CurrentWeatherResponse | null;

  constructor(private weatherService: WeatherApiService) { }

  ngOnInit(): void {
    this.weatherService.getCurrentWeatherData().subscribe(res => {
      this.weatherData = res;
      this.weatherData.main.temp = Math.round(this.weatherData.main.temp);
      console.log(this.weatherData);
      // console.log(this.weatherData.list[0].weather[0].icon);
    })
  }


  getWeather() {
    
  }

}
