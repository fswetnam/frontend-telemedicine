import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Doctor } from "./Doctor";
import { DoctorService } from "./doctor.service";

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
    patientState = new BehaviorSubject<Doctor>(null);
    patient$ = this.patientState.asObservable().subscribe();
    doctors!: Doctor[];
    doctor!: Doctor;
    message: any;
    constructor(private doctorService: DoctorService) {}

    ngOnInit(): void {
       this.getDoctors();
    }

    public getDoctors(){
        this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
            console.log(data);
            this.doctors = data;
        });
    }

    public save(form: NgForm){
        const response =  this.doctorService.saveDoctor(form.value as Doctor).subscribe((data) => {
            this.message = data
            this.getDoctors();
            form.reset();
        });
        return response;
    }

    public delete(doctor: Doctor){
        this.doctorService.deleteDoctor(doctor.id).subscribe((data) => {
            this.message = data
            this.getDoctors();
        });
    }

    public update(form: NgForm){
        const response = this.doctorService.updateDoctor(form.value as Doctor, this.doctor.id).subscribe((data) => {
            this.message = data
            this.getDoctors();
            form.reset();
        });
        return response;
    }

    public setDoctor(doctor: Doctor){
        console.log(doctor);
        this.doctor = doctor;
    }
} 