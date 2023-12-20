import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Token } from '../../shared/utils/tokens';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor() {}

  private tokenUtils = new Token();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenUtils.getToken();
    if (!token) {
      const requestWithToken = req.clone({
        headers: new HttpHeaders({
          Authorization: 'ExternalUser902010',
          Schema: 'redcard',
        }),
      });
      return next.handle(requestWithToken);
    } else {
      return next.handle(req);
    }
  }
}
