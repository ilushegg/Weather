import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { WeatherApiService } from '../services/weather-api/weather-api.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService, private weatherService: WeatherApiService, private loadingService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 404) {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'The city with this name is not found.'});
        }
        let city = this.weatherService.currentCity$.getValue().location;
        this.weatherService.location$.next(city);
        this.loadingService.isLoading$.next(false);
        return throwError(err);
      })
    );
  }
}
