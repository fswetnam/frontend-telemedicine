import { Component } from '@angular/core';
import { UserSession } from "src/app/user/UserSession";
import { UserType } from './enumeration/UserType';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  dashboardRoute = 'patientp';
  username = '';

  constructor(private http: HttpClient) {
    this.dashboardRoute = this.getDashboardPath()
    this.username = this.getUsername()
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
    localStorage.clear()
  }

  getUsername() {
    let user = UserSession.getUserSession();
    
    if(user.fname) {
      return user.fname + " " + user.lname;
    } else if(user.email) {
      return user.email
    } else {
      "User Options"
    }
  }

  getDashboardPath() {
    let user = UserSession.getUserSession()
    if(user === null){
      return 'home';
    }
    if(user.userType === UserType.PATIENT) {
      return 'patientp'
    } else if (user.userType === UserType.DOCTOR){
      return 'doctorp'
    } else if (user.userType === UserType.ADMIN){
      return 'adminp'
    }

    return null;
  }
}
