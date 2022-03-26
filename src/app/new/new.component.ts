import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { UserService } from "../user/user.service"
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  message: any;


  constructor(private UserService: UserService, private patientService: PatientService) { }

  ngOnInit() {
  }

  myNew(form: NgForm){
    let validPsw = this.checkPassword(form.value.userpassword, form.value.pswRepeat)
    if(validPsw == true){
        const response =  this.patientService.savePatient(form.value as Patient).subscribe((data) => {
        this.message = data;
        UserSession.setUserSession(data);
        alert("Account Successfully Created!");
        window.location.href="patientp";
      });
      return response;
    } else {
      alert("Passwords must match");
      form.reset();
      return null;
    }
  }

  checkPassword(pass: string, pswRepeat: string): Boolean{
    if(pass === pswRepeat){
      return true;
    } else {
      return false;
    }
  }
  
}