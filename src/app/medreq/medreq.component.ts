import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { RequestStatus } from '../enumeration/RequestStatus';
import { RequestType } from '../enumeration/RequestType';
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
  message: any;
  prescription: Prescription;

  constructor(private requestService: RequestService, private doctorService: DoctorService,
     private patientService: PatientService, private prescriptionService: PrescriptionService) { }

  

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
        this.message = data
        window.location.reload;
    });
}

public fulfillRequest(request: Requests){
  request.requestStatus = RequestStatus.CONFIRMED;
  this.requestService.updateRequest(request, request.id).subscribe((data) => {
      this.message = data
      window.location.reload;
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
  let myDoc = this.doctor;
  let myPat = this.patients.find(p => p.email === form.value.patientEmail) as Patient;

  let prescription = form.value as Prescription;
  prescription.patient = myPat;
  prescription.doctorPrescribed = this.doctor;
  
  const response =  this.prescriptionService.savePrescription(prescription).subscribe((data) => {
      this.message = data
      window.location.reload;
      form.reset();
      this.ngOnInit();
      window.location.reload();
  });
  return response;
}

public update(form: NgForm){
  const response = this.prescriptionService.updatePrescription(form.value as Prescription, this.prescription.id).subscribe((data) => {
      this.message = data;
      form.reset();
      this.prescriptions = [];
      this.ngOnInit();
      window.location.reload();
  });
  return response;
}

public deletePrescription(prescription: Prescription){
  let found = false;
  this.userRequests.forEach(req => {
    if(req.prescriptionRequest.id === prescription.id){
      this.requestService.deleteRequest(req.id).subscribe((data) => {
          this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {});
          this.message = data;
          this.ngOnInit();
          window.location.reload();
      })
      found = true;
    }
  })
  if(found == false){
    this.prescriptionService.deletePrescription(prescription.id).subscribe((data) => {
      this.message = data;
      this.ngOnInit();
      window.location.reload();
    });
  }
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