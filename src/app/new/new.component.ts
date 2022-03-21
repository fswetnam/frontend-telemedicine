import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user/User';
import { UserService } from "../user/user.service"

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  message: any;


  constructor(private UserService: UserService) { }

  ngOnInit() {
  }

  myNew(form: NgForm){
    let validPsw = this.checkPassword(form.value.userpassword, form.value.pswRepeat)
    if(validPsw == true){
        const response =  this.UserService.createNewUser(form.value as User).subscribe((data) => {
        this.message = data;
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