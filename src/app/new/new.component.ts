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
        this.message = data;
      });
      return response;
    } else {
      //alert(this.message);
      form.controls['userpassword'].reset();
      form.controls['pswRepeat'].reset();
      return null;
    }
  }

  checkPassword(pass: string, pswRepeat: string): Boolean{
    if(pass === pswRepeat){
      //ensure password is 12 chars long
      if(!(pass.length > 12)){
        alert("Password must be 12 characters long!")
        return false;
      }

      //check if password contains uppercase/lowercase characters, numbers, and symbols
      let upper = false;
      let lower = false;
      let digit = false;
      let symbols = false;
      let allowedSymbols = "!#$%&()*+,-.:;<=>?[]^_{}|~"
      let i = 0;
      for(i; i<pass.length; i++){
        let char = pass.substring(i, i+1);
        if(char === char.toUpperCase()){
          upper = true;
        }
        if(char === char.toLowerCase()){
          lower = true;
        }
        if(allowedSymbols.includes(char)){
          symbols = true;
        }
        if(/\d/.test(char)){
          digit = true;
        }
      }

      if(!upper || !lower || !symbols || !digit){
        alert("Password not valid. Password must be 12 characters long and contain: Upper and Lower case letters, at least one number(0-9), and at least one valid symbol: ! # $ % & ( ) * + , - . : ; < = > ? [ ] ^ _ { } | ~ ");
        return false;
      }

      return true;
    } else {
      alert("Passwords do not match!")
      return false;
    }
  }

}
