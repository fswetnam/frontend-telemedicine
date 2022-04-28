import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { MessageType } from '../enumeration/MessageType';
import { RequestStatus } from '../enumeration/RequestStatus';
import { RequestType } from '../enumeration/RequestType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { Prescription } from '../prescription/Prescription';
import { PrescriptionService } from '../prescription/prescription.service';
import { RequestService } from '../requests/request.service';
import { Requests } from '../requests/Requests';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-medreq',
  templateUrl: './medreq.component.html',
  styleUrls: ['./medreq.component.css']
})
export class MedreqComponent implements OnInit {
  doctor: Doctor;
  patients: Patient[];
  prescriptions: Prescription[];
  userRequests: Requests[] = [];
  mess: any;
  prescription: Prescription;
  confirmed = RequestStatus.CONFIRMED;
  denied = RequestStatus.DENIED;

  constructor(private requestService: RequestService, private doctorService: DoctorService,
     private patientService: PatientService, private prescriptionService: PrescriptionService, private messageService: MessageService) { }

  

  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getPatients();
    this.getRequests();
    console.log(this.userRequests);
    this.getPrescriptions();
  }

  public denyRequest(request: Requests){
    request.requestStatus = RequestStatus.DENIED;
    this.requestService.updateRequest(request, request.id).subscribe((data) => {
        this.mess = data
        let d = new Date();
      let message = <Message>{
          sender_id: this.doctor.id.toString(),
          receiver_id: request.requestingPatient.id.toString(),
          date: null,
          content: "Your refill request for " + request.prescriptionRequest.name + ", " + request.prescriptionRequest.dosages + " has been denied!",
          time: null,
          messageType: MessageType.EMAIL,
          subject: "PRECRIPTION REFILL REQUEST DENIED",
          viewed: null
      }
      this.messageService.saveMessage(message).forEach(m => m)
      window.location.reload();
    });
}

public fulfillRequest(request: Requests){
  request.requestStatus = RequestStatus.CONFIRMED;
  this.requestService.updateRequest(request, request.id).subscribe((data) => {
      this.mess = data
      let d = new Date();
      let message = <Message>{
          sender_id: this.doctor.id.toString(),
          receiver_id: request.requestingPatient.id.toString(),
          date: null,
          content: "Your refill request for " + request.prescriptionRequest.name + ", " + request.prescriptionRequest.dosages + " has been fulfilled!",
          time: null,
          messageType: MessageType.EMAIL,
          subject: "PRECRIPTION REFILL REQUEST FULFILLED",
          viewed: null
      }
      this.messageService.saveMessage(message).forEach(m => m)
      window.location.reload();
  });
}


public getRequests() {
  this.userRequests = [];
    this.doctorService.getRequests(this.doctor.id).subscribe((data: Requests[]) => {
      data.forEach(req => {
        if(req.requestType === RequestType.PRESCRIPTION_REQUEST && !this.userRequests.includes(req)){
          this.userRequests.push(<Requests> req);
        }
        this.requestService.getPatient(req.id).subscribe((data: Patient)=>{
          req.requestingPatient = <Patient> data;
        });
    });
        window.location.reload;
    });
}

public getPatients(){
  this.patientService.getPatients().subscribe((data: Patient[]) => {
      this.patients = data;
  });
}

public getPrescriptions(){
  this.doctorService.getPrescriptions(this.doctor.id).subscribe((data: Prescription[]) => {
      this.prescriptions = data;
      this.prescriptions.forEach(pre => {
          this.prescriptionService.getPatient(pre.id).subscribe((data)=>{
              pre.patient = <Patient> data;
              this.userRequests.forEach(req =>{
                  if(req.prescriptionRequest.id === pre.id){
                      req.requestingPatient = <Patient> data;
                  }
              });
          });
      });
  });
}

public prescribe(form: NgForm){
  //let myDoc = this.doctor;
  let myPat = this.patients.find(p => p.email === form.value.patientEmail) as Patient;

  let prescription = form.value as Prescription;
  prescription.patient = myPat;
  prescription.doctorPrescribed = this.doctor;
  
  const response =  this.prescriptionService.savePrescription(prescription).subscribe((data) => {
      this.mess = data
      form.reset();
      let d = new Date();
      let message = <Message>{
          sender_id: this.doctor.id.toString(),
          receiver_id: myPat.id.toString(),
          date: null,
          content: "Dr. " +  this.doctor.fname + " " + this.doctor.lname + " prescribed a new prescription!\n Prescription name: " 
          + prescription.name + ", Dosage: " + prescription.dosages,
          time: null,
          messageType: MessageType.EMAIL,
          subject: "NEW PRESCRIPTION",
          viewed: null
      }
      this.messageService.saveMessage(message).forEach(m => m)
      window.location.reload();
  });
  return response;
}

public update(form: NgForm){
  let content = this.setContent(form);
  this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data: Prescription) => {
    let d = new Date();
    let message = <Message>{
        sender_id: this.doctor.id.toString(),
        receiver_id: this.prescription.patient.id.toString(),
        date: null,
        content: content,
        time: null,
        messageType: MessageType.EMAIL,
        subject: "PRESCRIPTION UPDATE",
        viewed: null
    }
    this.messageService.saveMessage(message).forEach(m => m)
      this.mess = data;
      form.reset();
      this.prescriptions = [];
      this.ngOnInit();
      window.location.reload();
  });
}

setContent(form: NgForm): string{
  let content = "Dr. " +  this.doctor.fname + " " + this.doctor.lname + " updated a prescription!\n Prescription name: " 
  + this.prescription.name + ", Dosage: " + this.prescription.dosages + "\nUpdated Prescription: " 
  if(form.value.name != null && form.value.name != ""){
    content = content + "Name: " + form.value.name;
  }
  if(form.value.dosages != null && form.value.dosages != ""){
    content = content + ", Dosage: " + form.value.dosages;
  }
  if(form.value.description != null && form.value.description != ""){
    content = content + ", Description: " + form.value.description;
  }
  return content;
}

public deletePrescription(prescription: Prescription){
  let d = new Date();
  let message = <Message>{
      sender_id: this.doctor.id.toString(),
      receiver_id: prescription.patient.id.toString(),
      date: null,
      content: "Dr. " +  this.doctor.fname + " " + this.doctor.lname + " removed a prescription!\n Prescription name: " 
      + prescription.name + ", Dosage: " + prescription.dosages,
      time: null,
      messageType: MessageType.EMAIL,
      subject: "PRESCRIPTION REMOVED",
      viewed: null
  }
  this.messageService.saveMessage(message).forEach(m => m)
  let found = false;
  this.userRequests.forEach(req => {
    if(req.prescriptionRequest.id === prescription.id){
      this.requestService.deleteRequest(req.id).subscribe((data) => {
          this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {});
          this.mess = data;
          this.ngOnInit();
          window.location.reload();
      })
      found = true;
    }
  })
  if(found == false){
    this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
      this.mess = data;
      this.ngOnInit();
      window.location.reload();
    });
  }
}

public cancelRequest(request: Requests){
  this.requestService.deleteRequest(request.id).subscribe((data) => {
      this.mess = data;
          let d = new Date();
          let message = <Message>{
              sender_id: this.doctor.id.toString(),
              receiver_id: request.requestingPatient.id.toString(),
              date: null,
              content: "Dr. " + this.doctor.fname + " " + this.doctor.lname + " has deleted your request for prescription: Name: " + request.prescriptionRequest.name + ", Dosage:" + request.prescriptionRequest.dosages + ".",
              time: null,
              messageType: MessageType.EMAIL,
              subject: "PRECRIPTION REFILL REQUEST DELETED",
              viewed: null
          }
          this.messageService.saveMessage(message).forEach(m => m)
          alert("Request deleted")
          this.ngOnInit();
          window.location.reload();
  });
}


public setPrescription(prescription: Prescription){
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