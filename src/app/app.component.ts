import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Coords } from './models/coord';
import { SpinnerService } from './services/spinner/spinner.service';
import { StorageService } from './services/storage/storage.service';
import { WeatherApiService } from './services/weather-api/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  selectedCity: string;
  cities: {
    city: string,
    coord: Coords
  }[];

  constructor(private weatherService: WeatherApiService, private loadingService: SpinnerService, private storageService: StorageService) {

  }
  
  ngOnInit(): void {
    this.cities = this.storageService.getAllNameLocation();
    console.log(this.cities)
  this.weatherService.getCoordsByNavigator();
  }
  title = 'Weather';

  useLocation() {
    this.weatherService.getCoordsByNavigator();
    this.weatherService.useCoord$.next(true);
    this.weatherService.location$.next('');
    this.loadingService.isLoading$.next(true);
  }

  addToFavorite() {
    this.storageService.addToFavorite(this.weatherService.coord$.getValue(), this.weatherService.location$.getValue());
  }

}
