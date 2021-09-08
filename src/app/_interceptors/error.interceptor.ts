import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalStateErrors = [];
                for (const key in error.error.errors)
                if(error.error.errors[key])
                {
                  modalStateErrors.push(error.error.errors[key])
                }
              }
            break;

            case 401:

            break;

            case 404:

            break;

            case 500:

            break;

            default:
              break;

          }
        }
        return throwError(error);
      })
    );
  }
}
