import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {LoginComponent} from "./login/login.component";
import {Observable, retry} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(request)
    const re = '/login';
    const re1 = '/authenticate';
    if (request.url.search(re) === -1 && request.url.search(re1) === -1) {
      //console.log(localStorage.getItem("JWT-TOKEN"));
      let tokenReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("JWT-TOKEN"))
        }
      })
      return next.handle(tokenReq);
    }
    else return next.handle(request);
  }
}
