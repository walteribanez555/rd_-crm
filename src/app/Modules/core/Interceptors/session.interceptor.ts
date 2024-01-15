import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Token } from '../../shared/utils/tokens';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor() {}


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = Token.getToken();

    if (!token) {
      const requestWithDefaultToken = req.clone({
        headers: new HttpHeaders({
          Authorization: 'ExternalUser902010',
          Schema: 'redcard',
        }),
      });
      return next.handle(requestWithDefaultToken);
    } else {
      const requestWithToken = req.clone({
        headers: new HttpHeaders({
          Authorization: token,
          Schema: 'redcard',
        }),
      });
      return next.handle(requestWithToken);
    }
  }
}
