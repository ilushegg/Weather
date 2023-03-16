import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherResponse } from '../../models/response';
import { CurrentWeatherResponse } from '../../models/current-weather-response';
import { Forecast } from '../../models/forecast';
import { Coords } from 'src/app/models/coord';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  location$: BehaviorSubject<any> = new BehaviorSubject<any>('Moscow');
  coord$: BehaviorSubject<Coords> = new BehaviorSubject<Coords>({
    lat: 44.58883,
    lon: 33.5224,
  });
  useCoord$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {
    
  }


  getCoordsByNavigator() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coord$.next({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      })
    }
  }


  getCurrentWeatherData(): Observable<CurrentWeatherResponse> {
    try {
      if (this.useCoord$.getValue()) {
        return this.http.get<CurrentWeatherResponse>(`${environment.weather_api_url}weather?lat=${this.coord$.getValue().lat}&lon=${this.coord$.getValue().lon}&cnt=1&units=metric&appid=${environment.weather_api_key}`);

      }
      else {
        return this.http.get<CurrentWeatherResponse>(`${environment.weather_api_url}weather?q=${this.location$.getValue()}&cnt=1&units=metric&appid=${environment.weather_api_key}`);
      }
    }
    catch (er) {
      console.log(er)
      return of()
    }
  }

  getForecastData(): Observable<WeatherResponse<Forecast[]>> {

    try {
      if (this.useCoord$.getValue()) {
        return this.http.get<WeatherResponse<Forecast[]>>(`${environment.weather_api_url}forecast?lat=${this.coord$.getValue().lat}&lon=${this.coord$.getValue().lon}&units=metric&appid=${environment.weather_api_key}`);
      }
      else {
        return this.http.get<WeatherResponse<Forecast[]>>(`${environment.weather_api_url}forecast?q=${this.location$.getValue()}&units=metric&appid=${environment.weather_api_key}`);
      }
    }
    catch (er) {
      console.log(er)
      return of()
    }
  }



  formatWeatherProperties(temp: number, feelsLike: number, windSpeed: string, humidity: string) {
    temp = Math.round(temp);
    feelsLike = Math.round(feelsLike);
    windSpeed += ' m/s';
    humidity += ' %';
    return {
      temp,
      feelsLike,
      windSpeed,
      humidity
    }
  }

}

