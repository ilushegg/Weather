import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherResponse } from '../../models/response';
import { CurrentWeatherResponse } from '../../models/current-weather-response';
import { Forecast } from '../../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService{

  location$: BehaviorSubject<any> = new BehaviorSubject<any>('Sevastopol');
  coord$: BehaviorSubject<any> = new BehaviorSubject<any>({
    lat: 44.58883,
    lon: 33.5224,
  });

  private location: string;
  constructor(private http: HttpClient) {
    this.location$.subscribe(res => {
      this.location = res;
    })
   }


  getCurrentWeatherData() : Observable<CurrentWeatherResponse> {
    let result;
    try{
       result = this.http.get<CurrentWeatherResponse>(`${environment.weather_api_url}weather?q=${this.location}&cnt=1&units=metric&appid=${environment.weather_api_key}`);
    }
    catch(er) {
      console.log(er)
      return of()
    }
    return result;
  }
  
  getForecastData() : Observable<WeatherResponse<Forecast[]>> {
    return this.http.get<WeatherResponse<Forecast[]>>(`${environment.weather_api_url}forecast?q=${this.location}&units=metric&appid=${environment.weather_api_key}`);
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
