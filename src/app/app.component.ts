import { Component } from '@angular/core';
import { UserSession } from "src/app/user/UserSession";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  dashboardRoute = 'patientp';

  constructor() {
    this.dashboardRoute = this.getDashboardPath()
  }

  isLoggedIn() {
    let user = UserSession.getUserSession()
    if(user != null || user != undefined) {
      return true
    }
    return false
  }
  
  logout() {
    UserSession.setUserSession(null)
  }

  getDashboardPath() {
    let user = UserSession.getUserSession()
    if(user.userType == 'PATIENT') {
      return 'patientp'
    } else {
      return 'doctorp'
    }
  }
}
