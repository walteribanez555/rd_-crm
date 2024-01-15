import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { errorHandler } from '../handlers/error.handler';
import { Token } from '../../shared/utils/tokens';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('Error por aqui');

        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log(`Error event`);
          } else {
            const errorType = errorHandler(error);
            console.log(error);

            switch (errorType) {
              case HttpStatusCode.BadRequest:
                break;

              case 498:
                console.log('Expiro la Sesion');
                Token.deleteToken();
                localStorage.removeItem('rol_id');
                localStorage.removeItem('client_id');
                localStorage.removeItem('office_id');
                this.router.navigateByUrl('/auth/login');
                break;
            }

            throw new Error();
          }
        } else {
          console.log('An error ocurred');
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
