import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

import { WeatherApiService } from 'src/app/services/weather-api/weather-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchValue: string;




  constructor(private weatherService: WeatherApiService, public loadingService: SpinnerService) { }

  ngOnInit(): void {
  }

  search($event: any) {
    if ($event.key === 'Enter') {
    this.loadingService.isLoading$.next(true);
      this.weatherService.useCoord$.next(false);
      this.weatherService.location$.next(this.searchValue);
    }
    return;
  }


}
