import { Component, OnInit } from '@angular/core';
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
  message: any;
  doctor: Doctor;

  constructor(private doctorService: DoctorService) { }

  public getPatients(){
    this.doctorService.getPatients(this.doctor.id).subscribe((data: Patient[]) => {
        console.log(data);
        this.patients = data;
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
  

  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
  }

}