import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment } from '../appointment/Appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';

@Component({
  selector: 'app-sapp',
  templateUrl: './sapp.component.html',
  styleUrls: ['./sapp.component.css']
})
export class SappComponent implements OnInit {

  doctors!: Doctor[];
  appointments!: Appointment[];
  message: any;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService) { }

  
  ngOnInit() {
    this.getDoctors();
    this.getAppointments();
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      console.log(data);
      this.doctors = data;
    });
  }

  public getAppointments(){
    this.appointmentService.getAppointments().subscribe((data: Appointment[]) => {
        this.appointments = data;
        this.appointments.forEach(element => {
            this.appointmentService.getAppointmentPatient(element.id).subscribe((data) => {
                element.patient = data;
            });
            this.appointmentService.getAppointmentDoctor(element.id).subscribe((data) => {
                element.doctor = data;
            });
        });
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
      doctor: myDoc
    };
    const response =  this.appointmentService.saveAppointment(app).subscribe((data) => {
      this.message = data
      form.reset();
      this.getAppointments();
      alert("Appointment has been set!")
      window.location.href="patientp"
    });
  }
}
}