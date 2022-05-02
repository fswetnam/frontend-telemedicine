import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Doctor } from "../doctor/Doctor";
import { MessageType } from "../enumeration/MessageType";
import { RequestStatus } from "../enumeration/RequestStatus";
import { RequestType } from "../enumeration/RequestType";
import { Message } from "../message/message";
import { MessageService } from "../message/message.service";
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
    mess: any;
    patient: Patient;
    allRequests!: Requests[];
    userRequests: Requests[] = [];
    waiting = RequestStatus.WAITING;

    constructor(private prescriptionService: PrescriptionService, private messageService: MessageService,
        private patientService: PatientService,private requestService: RequestService) {}

    ngOnInit(): void {
        this.patient = UserSession.getUserSession();
        this.getRequests();
        this.getPrescriptions();
    }

    public getRequests() {
        this.userRequests=[];
        this.patientService.getRequests(this.patient.id).subscribe((data: Requests[]) => {
            data.forEach(req => {
                this.requestService.getDoctor(req.id).subscribe((data: Doctor)=>{
                    req.doctor = <Doctor> data;
                });
                if(req.requestType === RequestType.PRESCRIPTION_REQUEST){
                    this.userRequests.push(<Requests> req);
                }
            });
        });
    }

    public getPrescriptions(){
        this.patientService.getPrescriptions(this.patient.id).subscribe((data: Prescription[]) => {
            console.log(data);
            this.prescriptions = data;
            this.prescriptions.forEach(pre => {
                this.prescriptionService.getDoctor(pre.id).subscribe((data)=>{
                    pre.doctorPrescribed = <Doctor> data;
                });
            });
        });
    }

    public save(form: NgForm){
        let pS = form.value as Prescription;
        pS.patient = this.patient;
        const response =  this.prescriptionService.savePrescription(form.value as Prescription).subscribe((data) => {
            this.mess = data;
            form.reset();
            window.location.reload;
        });
        return response;
    }

    public cancelRequest(request: Requests){
        this.requestService.deleteRequest(request.id).subscribe((data) => {
            this.mess = data;
            if(request.requestStatus == RequestStatus.WAITING){
                let d = new Date();
                let message = <Message>{
                    sender_id: this.patient.id.toString(),
                    receiver_id: request.doctor.id.toString(),
                    date: null,
                    content: this.patient.fname + " " + this.patient.lname + " has canceled their refill request for prescription: Name: " + request.prescriptionRequest.name + ", Dosage:" + request.prescriptionRequest.dosages + ".",
                    time: null,
                    messageType: MessageType.EMAIL,
                    subject: "PRECRIPTION REFILL REQUEST CANCELED",
                    viewed: null
                }
                this.messageService.saveMessage(message).forEach(m => m)
                alert("Request canceled")
                this.ngOnInit();
                window.location.reload();
            } else {
                alert("Request deleted")
                this.ngOnInit();
                window.location.reload();
            }
            
        });
    }

    public delete(prescription: Prescription){
        this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
            this.mess = data;
            window.location.reload();
        });
    }

    public update(form: NgForm){
        const response = this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data) => {
            this.mess = data;
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
            this.mess = data
            let d = new Date();
            let message = <Message>{
                sender_id: this.patient.id.toString(),
                receiver_id: prescription.doctorPrescribed.id.toString(),
                date: null,
                content: this.patient.fname + " " + this.patient.lname + " has requested a refill for prescription: Name: " + prescription.name + ", Dosage: " + prescription.dosages,
                time: null,
                messageType: MessageType.EMAIL,
                subject: "PRECRIPTION REFILL REQUESTED",
                viewed: null
            }
        this.messageService.saveMessage(message).forEach(m => m)
            alert("Requested");
            window.location.reload();
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