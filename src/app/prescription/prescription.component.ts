import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Doctor } from "../doctor/Doctor";
import { DoctorService } from "../doctor/doctor.service";
import { RequestStatus } from "../enumeration/RequestStatus";
import { RequestType } from "../enumeration/RequestType";
import { Patient } from "../patient/Patient";
import { PatientService } from "../patient/patient.service";
import { RequestService } from "../requests/request.service";
import { Requests } from "../requests/Requests";
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
    doctors!: Doctor[];
    message: any;
    patient: Patient;
    allRequests!: Requests[];
    userRequests: Requests[] = [];
    constructor(private prescriptionService: PrescriptionService, 
        private patientService: PatientService, private doctorService: DoctorService,
        private requestService: RequestService) {}

    ngOnInit(): void {
        this.patient = UserSession.getUserSession();
        this.getRequests();
        this.getPrescriptions();
        console.log(this.prescriptions);
        console.log(this.userRequests);
    }

    public getRequests() {
        this.patientService.getRequestedPrescriptions(this.patient.id).subscribe((data: Requests[]) => {
            this.userRequests = <Requests[]> data;
            window.location.reload;
        });
    }

    public getPrescriptions(){
        this.patientService.getPrescriptions(this.patient.id).subscribe((data: Prescription[]) => {
            console.log(data);
            this.prescriptions = data;
            this.prescriptions.forEach(pre => {
                this.prescriptionService.getDoctor(pre.id).subscribe((data)=>{
                    pre.doctorPrescribed = <Doctor> data;
                    this.userRequests.forEach(req =>{
                        if(req.prescriptionRequest.id === pre.id){
                            req.doctor = <Doctor> data;
                        }
                    });
                });
            });
        });
    }

    public save(form: NgForm){
        let pS = form.value as Prescription;
        pS.patient = this.patient;
        const response =  this.prescriptionService.savePrescription(form.value as Prescription).subscribe((data) => {
            this.message = data
            console.log(data)
            form.reset();
            window.location.reload;
        });
        return response;
    }

    public cancelRequest(request: Requests){
        this.requestService.deleteRequest(request.id).subscribe((data) => {
            this.message = data
            this.ngOnInit();
            window.location.reload;
        });
    }

    public delete(prescription: Prescription){
        this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
            this.message = data;
            window.location.reload;
        });
    }

    public update(form: NgForm){
        const response = this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data) => {
            this.message = data;
            form.reset();
            window.location.reload;
        });
        return response;
    }

    public setPrescription(prescription: Prescription){
        console.log(prescription);
        this.prescription = prescription;
    }

    public refillPrescriptions(prescription: Prescription){
        let req = <Requests> {
        prescriptionRequest: prescription,
        requestType: RequestType.PRESCRIPTION_REQUEST,
        requestStatus: RequestStatus.WAITING,
        requestingPatient: this.patient,
        doctor: prescription.doctorPrescribed,
        }
        const response =  this.requestService.saveRequest(req).subscribe((data) => {
            this.message = data
            this.ngOnInit();
            window.location.reload;
            alert("Requested");
        });
        return response;
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