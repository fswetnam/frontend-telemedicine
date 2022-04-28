import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Admin } from "../admin/Admin";
import { AdminService } from "../admin/admin.service";
import { UserSession } from "../user/UserSession";

@Component({
    selector: 'app-settingsA',
    templateUrl: './settingsA.component.html',
    styleUrls: ['./settingsA.component.css']
  })
  export class SettingsAComponent implements OnInit {
  
    admin!: Admin;
  
    constructor(private adminService: AdminService) { }
  
    ngOnInit() {
      this.admin = UserSession.getUserSession();
    }

      //Found a bug where if you update the site logs the user out.
    updateAdmin(form: NgForm) {
        const response = this.adminService.updateAdmin(form.value as Admin, this.admin.id).subscribe((data: Admin) => {
          alert("Admin details updated!");
          UserSession.setUserSession(data);
          this.ngOnInit();
          window.location.reload();
      });
      return response;
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