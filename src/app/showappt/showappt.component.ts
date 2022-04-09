import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
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
  styleUrls: ['./showappt.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ]
})
export class ShowapptComponent implements OnInit {

  patients!: Patient[];
  appointments: Appointment[] = [];
  requests: Requests[];
  message: any;
  doctor: Doctor;
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
    private patientService: PatientService, private requestService: RequestService) { }

  
  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
    this.getAppointmentRequests();
    this.events = this.eventList;
    alert("Select view on right: Month, Week, Day");
  }

  public getPatients(){
    this.patientService.getPatients().subscribe((data: Patient[]) => {
        this.patients = data;
    });
}

public getAppointmentRequests(){
    this.doctorService.getRequests(this.doctor.id).subscribe((data: Requests[]) =>{
      this.requests = data;
      data.forEach(d=>{
        if(d.requestStatus === RequestStatus.CONFIRMED && d.requestType === RequestType.APPOINTMENT_REQUEST){
          this.requestService.getAppointmentRequest(d.id).subscribe((data: Appointment) => {
            this.requestService.getPatient(d.id).subscribe((p: Patient) => {
              this.eventList.push(<CalendarEvent>  {
                start: parseISO(data.dateScheduled),
                title: data.appointmentType + " " + data.purpose + " " + p.fname + " " + p.lname,
                allDay: false
              })
                })
            
          })
        }
    });
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

dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  console.log(date);
  this.specifiedDay = date;
}

eventClicked({event}: {event: CalendarEvent}): void {
  this.$event = event;
  console.log(this.$event);
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