import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionEventArgs, EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
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
  selector: 'app-showappt',
  templateUrl: './showappt.component.html',
  styleUrls: ['./showappt.component.css']
})
export class ShowapptComponent implements OnInit {

  patients!: Patient[];
  appointments: Appointment[] = [];
  requests: Requests[];
  message: any;
  doctor: Doctor;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService, 
    private patientService: PatientService, private requestService: RequestService) { }

  
  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
    this.getAppointmentRequests();
  }

  public data: object [] = [{
   
  }];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel = {
dataSource: this.data,
fields: {
  id: 'id',
  subject: { name: 'Subject', title: 'Event Name' },
  description: { name: 'Description', title: 'Event Description' },
  startTime: { name: 'StartTime', title: 'Start Duration' },
  endTime: { name: 'EndTime', title: 'End Duration'  }
}
  };

  public scheduleObj: ScheduleComponent;

  onPopupOpen(args) {
    console.log("popUp args", args.data);
    console.log("getEvent result", this.scheduleObj.getEvents(args.data));
  }

  onActionComplete(args: ActionEventArgs): void {
    console.log("actionComplete", args.requestType, args);

    switch (args.requestType) {
      case "viewNavigate":
      case "dateNavigate":
        this.scheduleObj.refresh();
        break;
      case "toolBarItemRendered":
        break;
      default:
    }
}

  public getPatients(){
    this.patientService.getPatients().subscribe((data: Patient[]) => {
        this.patients = data;
    });
}

public getAppointmentRequests(){
    this.doctorService.getRequests(this.doctor.id).subscribe((data: Requests[]) =>{
      console.log(data);
      this.requests = data;
      console.log(this.requests);
      data.forEach(d=>{
        if(d.requestStatus === RequestStatus.CONFIRMED && d.requestType === RequestType.APPOINTMENT_REQUEST){
           this.requestService.getPatient(d.id).subscribe((data: Patient) =>{
             d.appointmentRequest.patient = data;
           })
           this.appointments.push(d.appointmentRequest);
          }
      });
      console.log(this.appointments);
    })
} 

public delete(appointment: Appointment){
  this.requestService.getRequestByAppointment(appointment).subscribe((data: Requests)=>{
    this.requestService.deleteRequest(data.id).subscribe((data)=>{});
    this.message = data;
    this.appointments = [];
    window.location.reload;
  });
}

  myAppoint(form: NgForm){
  console.log(form.value.patientEmail);
  let myP = this.patients.find(p => p.email === form.value.patientEmail) as Patient;
  console.log(myP)
  var myDate = form.value.dateScheduled;
  var myTime = form.value.timeScheduled;
  if(myP === null || myP === undefined){
    alert("Please select a patient!")
  }else if (myDate == ""){
    alert("Please select a date!")
  }else if (myTime == ""){
    alert("Please select a time!")
  }else{
    
    let app = <Appointment>{
      dateScheduled: myDate + 'T' + myTime,
      patient: myP,
      doctor: this.doctor
    };
    const response =  this.appointmentService.saveAppointment(app).subscribe((data) => {
      this.doctorService.addPatient(this.doctor.id, myP).subscribe((data) => {});
      this.message = data
        form.reset();
        this.getAppointmentRequests();
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