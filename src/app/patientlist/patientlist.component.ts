import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  patients!: Patient[];
  patient!: Patient;
  message: any;
  doctor: Doctor;

  constructor(private patientService: PatientService) { }

  public getPatients(){
    this.patientService.getPatients().subscribe((data: Patient[]) => {
        console.log(data);
        this.patients = data;
    });
  }

  search(form: NgForm){
    let first = form.value.fname;
    let last = form.value.lname;
    let email = form.value.email;
    this.patient = this.patients.find(p => (p.fname = first) && (p.lname === last) && (p.email === email))
    if(this.patient == null || this.patient == undefined){
      alert("Patient not found!");
      form.reset();
    }
    console.log(this.patient)
  }

  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
  }

}