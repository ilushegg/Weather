import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  selectedCity: string;
  cities: {
    name: string
  }[];

  constructor() {

  }
  
  ngOnInit(): void {
    this.cities = [
      {name: 'New York'},
      {name: 'Rome'},
      {name: 'London',},
      {name: 'Istanbul',},
      {name: 'Paris',}
  ];
  }
  title = 'Weather';
}
