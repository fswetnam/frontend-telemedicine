import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";

import {UserSession} from "./user/UserSession";

export class authGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    let user = UserSession.getUserSession()
    return true;
  }


}
