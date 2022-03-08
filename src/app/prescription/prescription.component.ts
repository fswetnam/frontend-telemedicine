import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
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
    constructor(private prescriptionService: PrescriptionService) {}

    ngOnInit(): void {
        this.getPrescriptions();
    }

    public getPrescriptions(){
        this.prescriptionService.getPrescriptions().subscribe((data: Prescription[]) => {
            console.log(data);
            this.prescriptions = data;
        });
    }

    public save(form: NgForm){
        const response =  this.prescriptionService.savePrescription(form.value as Prescription).subscribe((data) => {
            this.message = data
            this.getPrescriptions();
            form.reset();
        });
        return response;
    }

    public delete(prescription: Prescription){
        this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
            this.message = data
            this.getPrescriptions();
        });
    }

    public update(form: NgForm){
        const response = this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data) => {
            this.message = data
            this.getPrescriptions();
            form.reset();
        });
        return response;
    }

    public setPrescription(prescription: Prescription){
        console.log(prescription);
        this.prescription = prescription;
    }
}