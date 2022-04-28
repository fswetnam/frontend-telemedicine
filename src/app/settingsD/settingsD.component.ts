import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Address } from "../address/Address";
import { AddressService } from "../address/address.service";
import { Doctor } from "../doctor/Doctor";
import { DoctorService } from "../doctor/doctor.service";
import { UserSession } from "../user/UserSession";

@Component({
    selector: 'app-settingsD',
    templateUrl: './settingsD.component.html',
    styleUrls: ['./settingsD.component.css']
  })
  export class SettingsDComponent implements OnInit {
  
    doctor!: Doctor;
    currAddress: Address;
    addresses: Address[] = [];

    constructor(private doctorService: DoctorService, private addressService: AddressService) { }
  
    ngOnInit() {
      this.doctor = UserSession.getUserSession();
      this.getAddress();
    }

      //Found a bug where if you update the site logs the user out.
    updateDoctor(form: NgForm) {
        const response = this.doctorService.updateDoctor(form.value as Doctor, this.doctor.id).subscribe((data: Doctor) => {
            alert("Doctor details updated!");
            UserSession.setUserSession(data);
            this.ngOnInit();
            window.location.reload();
        });
        return response;
    }

    getAddress() {
        this.doctorService.getOfficeAddress(this.doctor.id).subscribe((data: Address) => {
          if(data == null || data == undefined){
            this.currAddress = null;
          } else
            this.currAddress = data;
            this.addresses[0] = data;
        });
      }
    
      addAddress(form: NgForm){
          let address = form.value as Address;
          address.doctor = this.doctor;
          this.doctorService.addOfficeAddress(this.doctor.id, address).subscribe((data: Address)=>{
            this.currAddress = data;
            this.addresses[0] = (data);
            console.log(this.addresses)
            alert("New address has been added!");
            this.ngOnInit();
            window.location.reload();
          })
      }
    
      updateAddress(form: NgForm){
          this.addressService.updateAddress(form.value as Address, this.currAddress.id).subscribe((data: Address) => {
            this.currAddress = data;
            alert("Address has been updated!");
            this.ngOnInit();
            window.location.reload();
          })
      }
    
      public deleteAddress(address: Address){
        this.addressService.deleteAddress(address.id).subscribe((data) => {
            alert("Address deleted!");
            this.ngOnInit();
            window.location.reload();
        });
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