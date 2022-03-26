import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Patient } from "../patient/Patient";
import { PatientService } from "../patient/patient.service";
import { UserSession } from "../user/UserSession";
import { Prescription } from "./Prescription";
import { PrescriptionService } from "./prescription.service";
@Component({
    selector: 'app-prescription',
    templateUrl: './prescription.component.html',
    styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit{
    
    prescriptionState = new BehaviorSubject<Prescription>(null);
    prescription$ = this.prescriptionState.asObservable().subscribe();

    prescriptions!: Prescription[];
    prescription!: Prescription;
    message: any;
    patient: Patient;
    constructor(private prescriptionService: PrescriptionService, private patientService: PatientService) {}

    ngOnInit(): void {
        this.patient = UserSession.getUserSession();
        this.getPrescriptions();
    }

    public getPrescriptions(){
        this.patientService.getPrescriptions(this.patient.id).subscribe((data: Prescription[]) => {
            console.log(data);
            this.prescriptions = data;
        });
    }

    public save(form: NgForm){
        let pS = form.value as Prescription;
        pS.patient = this.patient;
        const response =  this.prescriptionService.savePrescription(form.value as Prescription).subscribe((data) => {
            this.message = data
            console.log(data)
            this.getPrescriptions();
            form.reset();
            window.location.reload;
        });
        return response;
    }

    public delete(prescription: Prescription){
        this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
            this.message = data
            this.getPrescriptions();
            window.location.reload;
        });
    }

    public update(form: NgForm){
        const response = this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data) => {
            this.message = data
            this.getPrescriptions();
            form.reset();
            window.location.reload;
        });
        return response;
    }

    public setPrescription(prescription: Prescription){
        console.log(prescription);
        this.prescription = prescription;
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