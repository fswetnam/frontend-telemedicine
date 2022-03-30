import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Doctor } from "../doctor/Doctor";
import { DoctorService } from "../doctor/doctor.service";
import { RequestStatus } from "../enumeration/RequestStatus";
import { RequestType } from "../enumeration/RequestType";
import { Patient } from "../patient/Patient";
import { PatientService } from "../patient/patient.service";
import { Prescription } from "../prescription/Prescription";
import { PrescriptionService } from "../prescription/prescription.service";
import { UserSession } from "../user/UserSession";
import { RequestService } from "./request.service";
import { Requests } from "./Requests";


@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
    
    requestState = new BehaviorSubject<Requests>(null);
    request$ = this.requestState.asObservable().subscribe();

    requests!: Requests[];
    request!: Requests;
    patients!: Patient[];
    doctors!: Doctor[];
    prescriptions!: Prescription[];
    message: any;
    user: any;
    constructor(private requestService: RequestService, private patientService: PatientService, private doctorService: DoctorService, private prescriptionService: PrescriptionService) {}

    ngOnInit(): void {
        this.user = UserSession.getUserSession();
        this.getAllRequests();
        this.getDoctors();
        this.getPatients();
        this.getPrescriptions();
    }

    public getAllRequests() {
        this.requestService.getRequests().subscribe((data: Requests[]) => {
            console.log(data);
            this.requests = data;
            this.requests.forEach(element =>{
                this.requestService.getDoctor(element.id).subscribe((data) => {
                    element.doctor = <Doctor> data;
                });
                this.requestService.getPatient(element.id).subscribe((data) =>{
                    element.requestingPatient = <Patient> data;
                });
            });
        });
    }
/*
    public getUserRequests(){
        this.patientService.getRequests().subscribe((data: Request[]) => {
            this.message = data;
            console.log(this.message);
            this.requests = data;
        });
    }
*/
    public getPatients(){
        this.patientService.getPatients().subscribe((data: Patient[]) => {
            console.log(data);
            this.patients = data;
        });
    }

    public getDoctors(){
        this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
            console.log(data);
            this.doctors = data;
        });
    }

    public getPrescriptions(){
        this.prescriptionService.getPrescriptions().subscribe((data: Prescription[]) => {
            console.log(data);
            this.prescriptions = data;
        });
    }

    public save(form: NgForm){
        let myDoc = this.doctors.find(d => d.email === form.value.doctorEmail) as Doctor;
        let myPat = this.patients.find(p => p.email === form.value.requestingPatient) as Patient;
        let myPre = this.prescriptions.find(pS => pS.id === form.value.prescriptionRequest.id) as Prescription;
        let reqStat = form.value.requestStatus as RequestStatus;
        let reqType = form.value.requestType as RequestType;

        let r = <Requests>{
            prescriptionRequest: myPre,
            requestType: reqType,
            requestStatus: reqStat,
            requestingPatient: myPat,
            doctor: myDoc
        }
        
        const response =  this.requestService.saveRequest(r).subscribe((data) => {
            this.message = data
            this.getAllRequests();
            form.reset();
        });
        return response;
    }

    public delete(request: Requests){
        this.requestService.deleteRequest(request.id).subscribe((data) => {
            this.message = data
            this.getAllRequests();
        });
    }

    public update(form: NgForm){
        const response = this.requestService.updateRequest(form.value as Requests, this.request.id).subscribe((data) => {
            this.message = data
            this.getAllRequests();        
            form.reset();
        });

        return response;
    }

    public setRequest(request: Requests) {
        console.log(request);
        this.request = request;
    }
}