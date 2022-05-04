import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserSession} from "./user/UserSession";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
    let user = UserSession.getUserSession();
    //console.log(user.userType)
    if(user.userType == "ADMIN")
      return true;
    else return false;
  }

}
