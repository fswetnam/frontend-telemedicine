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

    constructor(private patientService: PatientService, private doctorService: DoctorService, private adminService: AdminService) {}

    ngOnInit(): void {
        this.admin = UserSession.getUserSession();
    }

    savePatient(form: NgForm){
        const response =  this.patientService.savePatient(form.value as Patient).subscribe((data) => {
            this.message = data;
            form.reset();
            alert("Patient successfully created!");
        });
        return response;
    }

    saveDoctor(form: NgForm){
        const response =  this.doctorService.saveDoctor(form.value as Doctor).subscribe((data) => {
            this.message = data;
            form.reset();
            alert("Doctor successfully created!");
        });
        return response;
    }

    saveAdmin(form: NgForm) {
        const response =  this.adminService.saveAdmin(form.value as Admin).subscribe((data) => {
            this.message = data;
            form.reset();
            alert("Admin successfully created!");
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