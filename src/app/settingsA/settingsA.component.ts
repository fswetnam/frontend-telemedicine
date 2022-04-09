import { Component, OnInit } from "@angular/core";
import { Address } from "../address/Address";
import { AddressService } from "../address/address.service";
import { Doctor } from "../doctor/Doctor";
import { DoctorService } from "../doctor/doctor.service";
import { UserSession } from "../user/UserSession";

@Component({
    selector: 'app-settingsA',
    templateUrl: './settingsA.component.html',
    styleUrls: ['./settingsA.component.css']
  })
  export class SettingsAComponent implements OnInit {
  
    doctor!: Doctor;
    currAddress: Address;
    addresses: Address[] = [];
  
    constructor(private doctorService: DoctorService, private addressService: AddressService) { }
  
    ngOnInit() {
      this.doctor = UserSession.getUserSession();
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