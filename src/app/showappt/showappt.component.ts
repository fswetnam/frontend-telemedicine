import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment } from '../appointment/Appointment';
import { AppointmentService } from '../appointment/appointment.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-showappt',
  templateUrl: './showappt.component.html',
  styleUrls: ['./showappt.component.css']
})
export class ShowapptComponent implements OnInit {

  patients!: Patient[];
  appointments!: Appointment[];
  message: any;
  doctor: Doctor;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService, private patientService: PatientService) { }

  
  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
    this.getAppointments();
  }

  public getPatients(){
    this.patientService.getPatients().subscribe((data: Patient[]) => {
        console.log(data);
        this.patients = data;
    });
}

  public getAppointments(){
    this.doctorService.getAppointments(this.doctor.id).subscribe((data: Appointment[]) => {
        this.appointments = data;
        this.appointments.forEach(element => {
            this.appointmentService.getAppointmentPatient(element.id).subscribe((data) => {
                element.patient = <Patient>data;
            });
        });
    });
}

public delete(appointment: Appointment){
  console.log(appointment.id);
  this.appointmentService.deleteAppointment(appointment.id).subscribe((data) => {
      this.message = data
      this.getAppointments();
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