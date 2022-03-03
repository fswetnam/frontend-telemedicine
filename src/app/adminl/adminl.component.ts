import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-adminl',
  templateUrl: './adminl.component.html',
  styleUrls: ['./adminl.component.css']
})
export class AdminlComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  myFunction(myForm: NgForm){

    window.location.href='adminp';

    /*
    const form = myForm.value as NgForm;
    var em = form.value.email;
    var ps = form.value.psw;
    if(em.value =="test123@gmail.com" && ps.value =="123456"){
      window.location.href="adminp"
    }else{
      alert("The email and password is not valid")
    }*/
  }

}