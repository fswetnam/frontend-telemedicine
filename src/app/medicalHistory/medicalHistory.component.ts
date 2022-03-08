import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { MedicalHistory } from "./MedicalHistory";
import { MedicalHistoryService } from "./medicalHistory.service";
@Component({
    selector: 'app-medicalHistory',
    templateUrl: './medicalHistory.component.html',
    styleUrls: ['./medicalHistory.component.css']
})
export class MedicalHistoryComponent implements OnInit{
    
    mHState = new BehaviorSubject<MedicalHistory>(null);
    mH$ = this.mHState.asObservable().subscribe();

    medicalHistories!: MedicalHistory[];
    medicalHistory!: MedicalHistory;
    message: any;
    constructor(private medicalHistoryService: MedicalHistoryService) {}

    ngOnInit(): void {
        this.getMedicalHistories();
    }

    public getMedicalHistories() {
        this.medicalHistoryService.getMedicalHistory().subscribe((data: MedicalHistory[]) => {
            console.log(data);
            this.medicalHistories = data;
        });
    }

    public save(form: NgForm){
        const response =  this.medicalHistoryService.saveMedicalHistory(form.value as MedicalHistory).subscribe((data) => {
            this.message = data
            this.getMedicalHistories();
            form.reset();
        });
        return response;
    }

    public delete(medicalHistory: MedicalHistory){
        this.medicalHistoryService.deleteMedicalHistory(medicalHistory.id).subscribe((data) => {
            this.message = data
            this.getMedicalHistories();
        });
    }

    public update(form: NgForm){
        const response = this.medicalHistoryService.updateMedicalHistory(form.value as MedicalHistory, this.medicalHistory.id).subscribe((data) => {
            this.message = data
            this.getMedicalHistories();        
            form.reset();
        });

        return response;
    }

    public setMedicalHistory(medicalHistory: MedicalHistory) {
        console.log(medicalHistory);
        this.medicalHistory = medicalHistory;
    }
}