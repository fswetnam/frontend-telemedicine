import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { parseISO } from 'date-fns';
import { Admin } from '../admin/Admin';
import { AdminService } from '../admin/admin.service';
import { Appointment } from '../appointment/Appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { RequestStatus } from '../enumeration/RequestStatus';
import { RequestType } from '../enumeration/RequestType';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { RequestService } from '../requests/request.service';
import { Requests } from '../requests/Requests';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-sapp',
  templateUrl: './sapp.component.html',
  styleUrls: ['./sapp.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ]
})
export class SappComponent implements OnInit {

  doctors!: Doctor[];
  appointments: Appointment[] = [];
  admins!: Admin[];
  requests: Requests[] = [];
  message: any;
  patient: Patient;
  eventList: CalendarEvent[] = [];

  viewDate: Date = new Date();
  specifiedDay: Date;
  
  view: CalendarView;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [];

  displayStyle = "none";

  $event: any;

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService,
     private patientService: PatientService, private adminService: AdminService, private requestService: RequestService) { }

  
  ngOnInit() {
    this.patient = UserSession.getUserSession();
    this.getDoctors();
    this.getAdmins();
    this.getRequests();
    this.getAppointments();
    
    this.events = this.eventList;
    alert("Select view on right to load calendar and view scheduled appointments: Month, Week, Day");
  }


  getDoctors(){
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  getAdmins(){
    this.adminService.getAdmins().subscribe((data: Admin[])=> {
      this.admins = data;
    })
  }

  public getAppointments(){
    this.requests.forEach(r => {
      if(r.requestStatus === RequestStatus.CONFIRMED){
        let app = r.appointmentRequest;
        this.appointmentService.getAppointmentDoctor(app.id).subscribe((data: Doctor) => {
          app.doctor = data;
        })
        this.appointments.push(app);
      }
    })
    console.log(this.appointments)
    /*
    this.patientService.getAppointments(this.patient.id).subscribe((data: Appointment[]) => {
        this.appointments = data;
        this.appointments.forEach(element => {
            this.appointmentService.getAppointmentDoctor(element.id).subscribe((data) => {
                element.doctor = <Doctor>data;
            });
        });
    });
    */
}

public getRequests(){
  this.requests = [];
  this.patientService.getRequests(this.patient.id).subscribe((data: Requests[])=>{
    data.forEach(d => {
      if(d.requestType === RequestType.APPOINTMENT_REQUEST){
        this.requests.push(d);
      }
      if(d.requestStatus === RequestStatus.CONFIRMED && d.requestType === RequestType.APPOINTMENT_REQUEST){
        this.requestService.getAppointmentRequest(d.id).subscribe((data: Appointment) => {
          this.requestService.getDoctor(d.id).subscribe((p: Doctor) => {
            this.eventList.push(<CalendarEvent>  {
              start: parseISO(data.dateScheduled),
              title: data.appointmentType + " " + data.purpose + " " + p.fname + " " + p.lname,
              allDay: false
            })
              })
          
        })
      }
    });
    this.requests.forEach(r => {
      this.requestService.getDoctor(r.id).subscribe((data: Doctor) => {
        r.doctor = data;
      })
    })
  console.log(this.eventList);
 })
}

public cancelRequest(request: Requests){
  this.requestService.deleteRequest(request.id).subscribe((data) => {
      this.message = data;
      this.getRequests();
  });
}

public newRequest(form: NgForm){
  let ad = this.admins.find(a => a.email === "fswetnam@gmail.com");
  let doctor = this.doctors.find(d => d.email === form.value.doctorEmail);
    let app = <Appointment>{
      dateScheduled: form.value.dateScheduled + 'T' + form.value.timeScheduled,
      purpose: form.value.purpose,
      patient: this.patient,
      doctor: doctor,
      appointmentType: form.value.appointmentType
  };
  let req = <Requests> {
  appointmentRequest: app,
  requestType: RequestType.APPOINTMENT_REQUEST,
  requestStatus: RequestStatus.WAITING,
  requestingPatient: this.patient,
  doctor: doctor,
  admin: ad
  }
  const response =  this.requestService.saveRequest(req).subscribe((data) => {
      this.message = data;
      this.getRequests();
      alert("Requested");
  });
  return response;
}

public delete(req: Requests){
  console.log(req.id);
  this.requestService.deleteRequest(req.id).subscribe((data) => {
      window.location.reload;
  });
}

  myAppoint(form: NgForm){
  console.log(form.value.doctorEmail);
  let myDoc = this.doctors.find(d => d.email === form.value.doctorEmail) as Doctor;
  console.log(myDoc)
  var myDate = form.value.dateScheduled;
  var myTime = form.value.timeScheduled;
  if(myDoc === null || myDoc === undefined){
    alert("Please select a doctor!")
  }else if (myDate == ""){
    alert("Please select a date!")
  }else if (myTime == ""){
    alert("Please select a time!")
  }else{
    
    let app = <Appointment>{
      dateScheduled: myDate + 'T' + myTime,
      patient: this.patient,
      doctor: myDoc
    };
    const response =  this.appointmentService.saveAppointment(app).subscribe((data) => {
      this.doctorService.addPatient(myDoc.id, this.patient).subscribe((data) => {});
      this.message = data
      form.reset();
      this.getAppointments();
      alert("Appointment has been set!")
      window.location.reload;
    });
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