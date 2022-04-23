import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";

import {UserSession} from "./user/UserSession";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(request)
    const re = '/login';
    const re1 = '/authenticate';
    if (request.url.search(re) === -1 && request.url.search(re1) === -1) {
      //console.log(localStorage.getItem("JWT-TOKEN"));
      let tokenReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem("Token"))
        }
      })
      return next.handle(tokenReq).pipe(tap(()=> {},
        (err: any) => {
          if( err instanceof HttpErrorResponse){
            if (err.status === 401)
              return;
             alert("Your session has expired. Please login.");
            UserSession.setUserSession(null);
            this.router.navigateByUrl("/login");

          }

        }));

    }
    return next.handle(request)
  }
}



