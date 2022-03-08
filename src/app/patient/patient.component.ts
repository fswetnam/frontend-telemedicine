import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Patient } from "./Patient";
import { PatientService } from "./patient.service";
@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{
    patientState = new BehaviorSubject<Patient>(null);
    patient$ = this.patientState.asObservable().subscribe();
    patients!: Patient[];
    patient!: Patient;
    message: any;
    constructor(private patientService: PatientService) {}

    ngOnInit(): void {
       this.getPatients();
    }

    public getPatients(){
        this.patientService.getPatients().subscribe((data: Patient[]) => {
            console.log(data);
            this.patients = data;
        });
    }

    public save(form: NgForm){
        const response =  this.patientService.savePatient(form.value as Patient).subscribe((data) => {
            this.message = data
            this.getPatients();
            form.reset();
        });
        return response;
    }

    public delete(patient: Patient){
        this.patientService.deletePatient(patient.id).subscribe((data) => {
            this.message = data
            this.getPatients();
        });
    }

    public update(form: NgForm){
        const response = this.patientService.updatePatient(form.value as Patient, this.patient.id).subscribe((data) => {
            this.message = data
            this.getPatients();
            form.reset();
        });
        return response;
    }

    public setPatient(patient: Patient){
        console.log(patient);
        this.patient = patient;
    }
} 