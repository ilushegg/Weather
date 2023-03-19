import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/models/current-weather-response';
import { Forecast } from 'src/app/models/forecast';
import { WeatherResponse } from 'src/app/models/response';
import { WeatherApiService } from 'src/app/services/weather-api/weather-api.service';
import { switchMap, Observable, Subscription, debounceTime } from 'rxjs';
import { Coords } from 'src/app/models/coord';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  weatherData: CurrentWeatherResponse | null;
  coord: Coords = {
    lat: 0,
    lon: 0
  }
  bgImage: string;

  constructor(private weatherService: WeatherApiService, public loadingService: SpinnerService) {
    this.loadingService.isLoading$.next(true);

  }

  ngOnInit(): void {
    let time = new Date().getHours();
    if (time < 22) {
      this.bgImage = 'assets/images/bgs/evening.jpg';
    }
    if (time < 16) {
      this.bgImage = 'assets/images/bgs/day.jpg';
    }
    if (time < 11) {
      this.bgImage = 'assets/images/bgs/morning.jpg';
    }
    if (time < 4 || time > 23) {
      this.bgImage = 'assets/images/bgs/night.jpg';
    }
    this.weatherService.location$.pipe(debounceTime(100), switchMap(res => this.weatherService.getCurrentWeatherData())).subscribe(res => {
      this.weatherData = res;
      let formattedWeatherProps = this.weatherService.formatWeatherProperties(this.weatherData.main.temp, this.weatherData.main.feels_like, this.weatherData.wind.speed, this.weatherData.main.humidity);
      this.weatherData.main.temp = formattedWeatherProps.temp;
      this.weatherData.main.feels_like = formattedWeatherProps.feelsLike;
      this.weatherData.wind.speed = formattedWeatherProps.windSpeed;
      this.weatherData.main.humidity = formattedWeatherProps.humidity;
      this.weatherService.coord$.next({
        lat: this.weatherData.coord.lat,
        lon: this.weatherData.coord.lon
      });
      this.weatherService.currentCity$.next({
        location: this.weatherData.name,
        coord: this.weatherData.coord
      });
      debounceTime(500);
      this.loadingService.isLoading$.next(false);

    });
    this.weatherService.coord$.subscribe(value => {
      this.coord.lat = value.lat;
      this.coord.lon = value.lon;
    });
  }


}
