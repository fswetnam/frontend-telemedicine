import { Component, OnInit } from "@angular/core";
import { Admin } from "../admin/Admin";
import { AdminService } from "../admin/admin.service";
import { UserSession } from "../user/UserSession";

@Component({
    selector: 'app-settingsD',
    templateUrl: './settingsD.component.html',
    styleUrls: ['./settingsD.component.css']
  })
  export class SettingsDComponent implements OnInit {
  
    admin!: Admin;
    constructor(private adminService: AdminService) { }
  
    ngOnInit() {
      this.admin = UserSession.getUserSession();
    }

    
  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}