import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CurrentWeatherComponent } from './components/weather/current-weather.component';
import { SearchComponent } from './components/search/search.component';


import { InputTextModule } from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';

import { ForecastComponent } from './components/forecast/forecast.component';
import { YandexMapsComponent } from './components/yandex-maps/yandex-maps.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    SearchComponent,
    ForecastComponent,
    YandexMapsComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    AngularYandexMapsModule,
    ProgressSpinnerModule,
    DropdownModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    ToastModule,
    SidebarModule,
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
