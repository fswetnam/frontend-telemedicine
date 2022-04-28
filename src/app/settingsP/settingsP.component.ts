import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from '../address/Address';
import { AddressService } from '../address/address.service';
import { Insurance } from '../insurance/Insurance';
import { InsuranceService } from '../insurance/insurance.service';
import { MedicalHistory } from '../medicalHistory/MedicalHistory';
import { MedicalHistoryService } from '../medicalHistory/medicalHistory.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-settingsP',
  templateUrl: './settingsP.component.html',
  styleUrls: ['./settingsP.component.css']
})
export class SettingsPComponent implements OnInit {

  patient!: Patient;
  currAddress: Address;
  addresses: Address[] = [];
  @Input() insurances: Insurance[];
  @Input() insurance!: Insurance;
  @Input() medicalHistories: MedicalHistory[];
  @Input() medicalHistory!: MedicalHistory;

  constructor(private patientService: PatientService, private addressService: AddressService, 
    private insuranceService: InsuranceService, private medicalHistoryService: MedicalHistoryService) { }

  ngOnInit() {
    this.patient = UserSession.getUserSession();
    this.getAddress();
    this.getInsurance();
    this.getMedicalHistory();
  }

  getAddress() {
    this.patientService.getAddress(this.patient.id).subscribe((data: Address) => {
      if(data == null || data == undefined){
        this.currAddress = null;
      } else
        this.currAddress = data;
        this.addresses[0] = data;
    });
  }

  addAddress(form: NgForm){
      let address = form.value as Address;
      address.patient = this.patient;
      this.patientService.addAddress(this.patient.id, address).subscribe((data: Address)=>{
        this.currAddress = data;
        this.addresses[0] = (data);
        console.log(this.addresses)
        alert("New address has been added!");
        this.ngOnInit();
        window.location.reload();
      })
  }

  updateAddress(form: NgForm){
      this.addressService.updateAddress(form.value as Address, this.currAddress.id).subscribe((data: Address) => {
        this.currAddress = data;
        alert("Address has been updated!");
        this.ngOnInit();
        window.location.reload();
      })
  }

  public deleteAddress(address: Address){
    this.addressService.deleteAddress(address.id).subscribe((data) => {
        alert("Address deleted!");
        this.ngOnInit();
        window.location.reload();
    });
}

  getInsurance() {
    this.patientService.getInsurance(this.patient.id).subscribe((data: Insurance[]) => {
      this.insurances = data;
  });
  }

  addInsurance(form: NgForm){
    let insurance = form.value as Insurance;
    insurance.patient = this.patient;
    this.patientService.addInsurance(this.patient.id, insurance).subscribe((data) => { 
      alert("Insurance added!");
      this.ngOnInit();
      window.location.reload();
  });
  }

  updateInsurance(form: NgForm) {
    this.insuranceService.updateInsurance(form.value as Insurance, this.insurance.id).subscribe((data) => {
      alert("Insurance updated!")
      this.ngOnInit();
      window.location.reload();
    });
  }

  public setInsurance(insurance: Insurance){
    this.insurance = insurance;
  } 

  public deleteInsurance(insurance: Insurance){
    this.insuranceService.deleteInsurance(insurance.id).subscribe((data) => {
        alert("Insurance deleted!");
        this.ngOnInit();
        window.location.reload();
    });  
  }

  //Found a bug where if you update the site logs the user out.
  updatePatient(form: NgForm) {
    this.patientService.updatePatient(form.value as Patient, this.patient.id).subscribe((data: Patient) => {
      alert("Patient details updated!");
      UserSession.setUserSession(data);
      this.ngOnInit();
      window.location.reload();
  });
  }

  addMedicalHistory(form: NgForm){
    this.medicalHistory = <MedicalHistory> {
      name: form.value.name,
      doctorDiagnosed: form.value.doctorDiagnosed,
      dateDiagnosed: <Date> form.value.dateDiagnosed,
      description: form.value.description,
      patient: this.patient
    }
    this.patientService.addMedicalHistory(this.patient.id, this.medicalHistory).subscribe((data: MedicalHistory) => {    
      alert("Medical condition added!");
      this.ngOnInit();
      window.location.reload();
  });
  }

  getMedicalHistory() {
    this.patientService.getMedicalHistory(this.patient.id).subscribe((data: MedicalHistory[]) => {
      this.medicalHistories = data;
      console.log(this.medicalHistories);
  });
  }

  public deleteMedicalHistory(medicalHistory: MedicalHistory){
    this.medicalHistoryService.deleteMedicalHistory(medicalHistory.id).subscribe((data) => {
      alert("Medical condition deleted!");
      this.ngOnInit();
      window.location.reload();
    });
  }

  public updateMedicalHistory(form: NgForm){
    let medicalHistory = <MedicalHistory> {
      name: form.value.name,
      doctorDiagnosed: form.value.doctorDiagnosed,
      dateDiagnosed: <Date> form.value.dateDiagnosed,
      description: form.value.description,
      patient: this.patient
    }
    this.medicalHistoryService.updateMedicalHistory(medicalHistory, this.medicalHistory.id).subscribe((data) => {
      alert("Medical Condition updated!");
      this.ngOnInit();
      window.location.reload();
    });
}

public setMedicalHistory(medicalHistory: MedicalHistory) {
    console.log(medicalHistory);
    this.medicalHistory = medicalHistory;
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