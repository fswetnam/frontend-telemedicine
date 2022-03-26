import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, of } from "rxjs";
import { Doctor } from "../doctor/Doctor";
import { DoctorService } from "../doctor/doctor.service";
import { Patient } from "../patient/Patient";
import { PatientService } from "../patient/patient.service";
import { Appointment } from "./Appointment";
import { AppointmentService } from "./appointment.service";

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
    appointmentState = new BehaviorSubject<Appointment>(null);
    appointment$ = this.appointmentState.asObservable().subscribe();
    appointments!: Appointment[];
    doctors!: Doctor[];
    doctor!: Doctor;
    patients!: Patient[];
    patient!: Patient;
    appointment!: Appointment;
    p!: Patient;
    d!: Doctor;
    message: any;
    constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, 
        private patientService: PatientService) {}

    ngOnInit(): void {
        this.getDoctors();
        this.getPatients();
        this.getAppointments();
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

    public getDoctors(){
        this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
            this.doctors = data;
        });
    }

    public getPatients(){
        this.patientService.getPatients().subscribe((data: Patient[]) => {
            this.patients = data;
        });
    }

    public save(form: NgForm){
        let patient = this.patients.find(p => p.email === form.value.patientEmail);
        let doctor = this.doctors.find(d => d.email === form.value.doctorEmail);
        let app = <Appointment>{
            dateScheduled: form.value.dateScheduled + 'T' + form.value.timeScheduled,
            purpose: form.value.purpose,
            patient: patient,
            doctor: doctor
        };
        const response =  this.appointmentService.saveAppointment(app).subscribe((data) => {
            this.message = data
            this.ngOnInit();
            form.reset();
        });
        return response;
    }

    public delete(appointment: Appointment){
        console.log(appointment.id);
        this.appointmentService.deleteAppointment(appointment.id).subscribe((data) => {
            this.message = data
            this.ngOnInit()
        });
    }

    public update(form: NgForm){
        
        let dateScheduled = form.value.dateScheduled;
        let timeScheduled = form.value.timeScheduled;
        let purpose = form.value.purpose;
        this.p = this.patients.find(p => p.email === form.value.patientEmail);
        this.d = this.doctors.find(d => d.email === form.value.doctorEmail);
        if((dateScheduled != undefined || dateScheduled != null) && (timeScheduled != undefined || timeScheduled != null)){
            let app = <Appointment>{
                dateScheduled: dateScheduled + 'T' + timeScheduled,
                purpose: purpose,
                patient: this.p,
                doctor: this.d
            };
            const response = this.appointmentService.updateAppointment(app as Appointment, this.appointment.id).subscribe((data) => {
                this.message = data
                this.ngOnInit();
                form.reset();
                this.p = {} as Patient;
                this.d = {} as Doctor;
            });
            return response;
        } else if((timeScheduled != undefined || timeScheduled != null) && (dateScheduled == null || dateScheduled == undefined)) {
            let app = <Appointment>{
                dateScheduled: timeScheduled,
                purpose: purpose,
                patient: this.p,
                doctor: this.d
            };
            const response = this.appointmentService.updateAppointment(app as Appointment, this.appointment.id).subscribe((data) => {
                this.message = data
                this.ngOnInit();
                form.reset();
                this.p = {} as Patient;
                this.d = {} as Doctor;
            });
            return response;
        } else if((dateScheduled != undefined || dateScheduled != null) && (timeScheduled == null || timeScheduled == undefined)){
            let app = <Appointment>{
                dateScheduled: dateScheduled,
                purpose: purpose,
                patient: this.p,
                doctor: this.d
            };
            const response = this.appointmentService.updateAppointment(app as Appointment, this.appointment.id).subscribe((data) => {
                this.message = data
                this.ngOnInit();
                form.reset();
                this.p = {} as Patient;
                this.d = {} as Doctor;
            });
            return response;
        } else {
            let app = <Appointment>{
            dateScheduled: dateScheduled + 'T' + timeScheduled,
            purpose: purpose,
            patient: this.p,
            doctor: this.d
            };
            const response = this.appointmentService.updateAppointment(app as Appointment, this.appointment.id).subscribe((data) => {
                this.message = data
                this.ngOnInit();
                form.reset();
                this.p = {} as Patient;
                this.d = {} as Doctor;
            });
            return response;
        }
    }

    public setAppointment(appointment: Appointment){
        console.log(appointment);
        this.appointment = appointment;
    }
} 