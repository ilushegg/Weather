import { Component, Input, OnInit } from '@angular/core';
import { YaConfig, YaReadyEvent } from 'angular8-yandex-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-yandex-maps',
  templateUrl: './yandex-maps.component.html',
  styleUrls: ['./yandex-maps.component.scss']
})
export class YandexMapsComponent implements OnInit {

  @Input()
  lat: number;
  @Input()
  lon: number;

  mapConfig: YaConfig = {
    apikey: environment.yamaps_api_key,
    lang: 'en_US',
  };

  constructor() { }

  ngOnInit(): void {
  }

  onReady(event: YaReadyEvent<ymaps.Map>) {

  }

}
