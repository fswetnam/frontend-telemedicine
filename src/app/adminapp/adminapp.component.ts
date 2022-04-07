import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, MonthService, AgendaService, EventSettingsModel, ActionEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { DatePipe } from '@angular/common';
import { Patient } from '../patient/Patient';
import { Appointment } from '../appointment/Appointment';
import { Requests } from '../requests/Requests';
import { Doctor } from '../doctor/Doctor';
import { Admin } from '../admin/Admin';
import { RequestService } from '../requests/request.service';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { AdminService } from '../admin/admin.service';
import { UserSession } from '../user/UserSession';
import { RequestStatus } from '../enumeration/RequestStatus';
import { NgForm } from '@angular/forms';
import { RequestType } from '../enumeration/RequestType';
@Component({
  selector: "app-adminapp",
  templateUrl: "./adminapp.component.html",
  styleUrls: ['./adminapp.component.css'],
  template: `<ejs-schedule> </ejs-schedule>`
})
export class AdminappComponent implements OnInit{

    patients!: Patient[];
    appointments: Appointment[] = [];
    requests: Requests[];
    message: any;
    doctors!: Doctor[];
    admin: Admin;

    constructor(private requestService: RequestService, private doctorService: DoctorService,
      private patientService: PatientService, private adminService: AdminService) { }
 
   
 
   ngOnInit() {
     this.admin = UserSession.getUserSession();
     this.getPatients();
     this.getDoctors();
     this.getRequests();
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

    public getRequests(){
      this.adminService.getAppointments(this.admin.id).subscribe((data: Requests[]) => {
          this.requests = data;
          this.requests.forEach(r => {
            this.requestService.getDoctor(r.id).subscribe((data: Doctor) => {
              r.doctor = data;
              this.requestService.getPatient(r.id).subscribe((data: Patient) => {
                r.requestingPatient = data;
              });
            });
          });
      });
    }

    public denyRequest(request: Requests){
      request.requestStatus = RequestStatus.DENIED;
      this.requestService.updateRequest(request, request.id).subscribe((data) => {
          this.message = data
          window.location.reload;
      });
  }
  
  public fulfillRequest(request: Requests){
    request.requestStatus = RequestStatus.CONFIRMED;
    this.requestService.updateRequest(request, request.id).subscribe((data) => {
        this.message = data
        window.location.reload;
    });
  }
  
  public save(form: NgForm){
    let myDoc = this.doctors.find(d => d.email === form.value.doctorEmail) as Doctor;
    let myPat = this.patients.find(p => p.email === form.value.patientEmail) as Patient;
    let reqStat = RequestStatus.CONFIRMED;
    let reqType = RequestType.APPOINTMENT_REQUEST;

    let app = <Appointment>{
      dateScheduled: form.value.dateScheduled + 'T' + form.value.timeScheduled,
      purpose: form.value.purpose,
      patient: myPat,
      doctor: myDoc,
      appointmentType: form.value.appointmentType
    };

    console.log(app);

    let r = <Requests>{
        appointmentRequest: app,
        requestType: reqType,
        requestStatus: reqStat,
        requestingPatient: myPat,
        doctor: myDoc,
        admin: this.admin
    }

    console.log(r);
    
    const response =  this.requestService.saveRequest(r).subscribe((data) => {
        this.message = data;
        form.reset();
        this.getRequests();
        window.location.reload;
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