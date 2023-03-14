import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  

  coord = {
    lat: 0,
    lon: 0
  }

  constructor(private weatherService: WeatherApiService) {

  }
  
  ngOnInit(): void {
    this.weatherService.coord$.subscribe(value => {
      this.coord.lat = value.lat;
      this.coord.lon = value.lon;
    });
  }
  title = 'Weather';
}
