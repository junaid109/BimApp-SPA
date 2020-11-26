import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(req).pipe(
            catchError(error => {
                if(error instanceof HttpErrorResponse) {
                    const appError = error.headers.get("Application-Error");
                    if(appError) {
                        console.log(appError);
                        return throwError(appError);
                    }

                    const serverError = error.error;
                    let modalStateErrors = '';
                    if(serverError.errors && typeof serverError.errors === 'object') {
                      for (const key in serverError.errors) {
                        if(serverError.errors[key]) {
                          modalStateErrors += serverError.errors[key] + '\n';
                        }
                      }
                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
