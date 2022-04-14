import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Admin } from "src/app/admin/Admin";
import { AdminService } from "src/app/admin/admin.service";
import { Doctor } from "src/app/doctor/Doctor";
import { DoctorService } from "src/app/doctor/doctor.service";
import { Patient } from "src/app/patient/Patient";
import { PatientService } from "src/app/patient/patient.service";
import { UserSession } from "src/app/user/UserSession";

@Component({
    selector: "app-adminadduser",
    templateUrl: "./adminadduser.component.html",
    styleUrls: ['./adminadduser.component.css']
  })
export class AdminAddUserComponent implements OnInit{

    admin: Admin;
    message: any;
    patients: Patient[];
    doctors: Doctor[];

    constructor(private patientService: PatientService, private doctorService: DoctorService, private adminService: AdminService) {}

    ngOnInit(): void {
        this.admin = UserSession.getUserSession();
        this.getDoctors();
        this.getPatients();
    }

    public getPatients(){
        this.patientService.getPatients().subscribe((data: Patient[]) => {
            this.patients = data;
        });
        }   
    
    public getDoctors(){
        this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
            this.doctors = data;
        });
    }

    savePatient(form: NgForm){
        let validPsw = this.checkPassword(form.value.userpassword, form.value.pswRepeat)
        if(validPsw) {
        const response =  this.patientService.savePatient(form.value as Patient).subscribe((data) => {
            this.message = data;
            form.reset();
            alert("Patient successfully created!");
            window.location.reload();
        });
        return response;
        } else {
            form.reset();
            return null;
        }
    }

    saveDoctor(form: NgForm){
        let validPsw = this.checkPassword(form.value.userpassword, form.value.pswRepeat)
        if(validPsw) {
            const response =  this.doctorService.saveDoctor(form.value as Doctor).subscribe((data) => {
                this.message = data;
                form.reset();
                alert("Doctor successfully created!");
                window.location.reload();
            });
            return response;
        } else {
            alert(this.message);
            form.reset();
            return null;
        }
    }

    saveAdmin(form: NgForm) {
        let validPsw = this.checkPassword(form.value.userpassword, form.value.pswRepeat)
        if(validPsw) {
            const response =  this.adminService.saveAdmin(form.value as Admin).subscribe((data) => {
                this.message = data;
                form.reset();
                alert("Admin successfully created!");
            });
            return response;
        } else {
            alert(this.message);
            form.reset();
            return null;
        }
    }

    checkPassword(pass: string, pswRepeat: string): Boolean{
        if(pass === pswRepeat){
          //ensure password is 12 chars long
          if(!(pass.length > 12)){
            alert("Password must be 12 characters long!")
            return false;
          }
    
          //check if password contains uppercase/lowercase characters, numbers, and symbols
          let upper = false;
          let lower = false;
          let digit = false;
          let symbols = false;
          let allowedSymbols = "!#$%&()*+,-.:;<=>?[]^_{}|~"
          let i = 0;
          for(i; i<pass.length; i++){
            let char = pass.substring(i, i+1);
            if(char === char.toUpperCase()){
              upper = true;
            }
            if(char === char.toLowerCase()){
              lower = true;
            }
            if(allowedSymbols.includes(char)){
              symbols = true;
            }
            if(/\d/.test(char)){
              digit = true;
            }
          }
    
          if(!upper || !lower || !symbols || !digit){
            alert("Password not valid. Password must be 12 characters long and contain: Upper and Lower case letters, at least one number(0-9), and at least one valid symbol: ! # $ % & ( ) * + , - . : ; < = > ? [ ] ^ _ { } | ~ ");
            return false;
          }
          
          return true;
        } else {
          alert("Passwords do not match!")
          return false;
        }
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