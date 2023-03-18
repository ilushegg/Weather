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
  
  selectedCity: {
    city: string,
    coord: Coords
  };
  cities: {
    city: string,
    coord: Coords

  }[];
  existsInFav: boolean = false;
  isSideMenuVisible: boolean = false;

  constructor(private weatherService: WeatherApiService, public loadingService: SpinnerService, private storageService: StorageService) {

  }
  
  ngOnInit(): void {
    this.cities = this.storageService.getAllNameLocation();
    this.weatherService.getCoordsByNavigator();
    this.weatherService.currentCity$.subscribe(currentCity => {
      if (this.cities.filter(city => city.city === currentCity.location).length === 0){
        this.existsInFav = false;
      }
      else{
        this.existsInFav = true;
      }
    })
  }
  title = 'Weather';

  useLocation() {
    this.weatherService.getCoordsByNavigator();
    this.weatherService.useCoord$.next(true);
    this.weatherService.location$.next('');
    this.loadingService.isLoading$.next(true);
  }

  addToFavorite() {
    let currentCity = this.weatherService.currentCity$.getValue().location;
    let coord = this.weatherService.currentCity$.getValue().coord;
    if(this.storageService.addToFavorite(coord, currentCity)){
      this.cities.push({coord: coord, city: currentCity});
      this.existsInFav = true;

    }
  }

  deleteFromFavorite() {
    let currentCity = this.weatherService.currentCity$.getValue().location;
    this.storageService.deleteFromFavorite(currentCity);
    this.cities = this.cities.filter(city => city.city !== currentCity);
    this.existsInFav = false;

  }

  selectCity() {
    this.weatherService.location$.next(this.selectedCity.city);
    this.loadingService.isLoading$.next(true);
  }

}
