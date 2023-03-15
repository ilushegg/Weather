import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './components/forecast/forecast.component';
import { CurrentWeatherComponent } from './components/weather/current-weather.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentWeatherComponent
  },
  {
    path: 'forecast',
    component: ForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
