import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrentWeatherComponent } from './components/weather/current-weather.component';
import { SearchComponent } from './components/search/search.component';


import { InputTextModule } from 'primeng/inputtext';
import { ForecastComponent } from './components/forecast/forecast.component';
import { YandexMapsComponent } from './components/yandex-maps/yandex-maps.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    SearchComponent,
    ForecastComponent,
    YandexMapsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    AngularYandexMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
