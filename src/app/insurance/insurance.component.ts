import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Insurance } from "./Insurance";
import { InsuranceService } from "./insurance.service";
@Component({
    selector: 'app-insurance',
    templateUrl: './insurance.component.html',
    styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
    
    insuranceState = new BehaviorSubject<Insurance>(null);
    insurance$ = this.insuranceState.asObservable().subscribe();

    insurances!: Insurance[];
    insurance!: Insurance;
    message: any;
    constructor(private insuranceService: InsuranceService) {}

    ngOnInit(): void {
        this.insuranceService.getInsurances().subscribe((data: Insurance[]) => {
            console.log(data);
            this.insurances = data;
        });
    }

    public save(form: NgForm){
        const response =  this.insuranceService.saveInsurance(form.value as Insurance).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }

    public delete(id: number){
        this.insuranceService.deleteInsurance(id).subscribe((data) => this.message = data);
        window.location.reload();
    }

    public update(form: NgForm, i: Insurance){
        const response = this.insuranceService.updateInsurance(form.value as Insurance, i.id).subscribe((data) => this.message = data);
        window.location.reload();
        return response;
    }
}