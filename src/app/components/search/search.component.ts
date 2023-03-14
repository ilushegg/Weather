import { Component, OnInit } from '@angular/core';

import { WeatherApiService } from 'src/app/services/weather-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchValue: string;




  constructor(private weatherService: WeatherApiService) { }

  ngOnInit(): void {
  }

  search($event: any) {
    if($event.key === 'Enter'){
      this.weatherService.location$.next(this.searchValue);
      console.log(this.searchValue)
    }
    return;
  }


}
