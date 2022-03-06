import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Patient } from "src/patient/Patient";
import { PatientService } from "src/patient/patient.service";

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
        this.patientService.getPatients().subscribe((data: Patient[]) => {
            console.log(data);
            this.patients = data;
        });
    }

    public save(form: NgForm){
        const response =  this.patientService.savePatient(form.value as Patient).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }

    public delete(id: number){
        this.patientService.deletePatient(id).subscribe((data) => this.message = data);
        window.location.reload();
    }

    public update(form: NgForm, p: Patient){
        const response = this.patientService.updatePatient(form.value as Patient, p.id).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }

}