import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myReturn(){

    window.location.href="patientp"

    /*
    var em = document.forms["myForm"]["email"].value;
    var ps = document.forms["myForm"]["psw"].value;
    if(em =="happychaos@gmail.com" && ps =="06112021"){
      window.location.href="patientp"
    }else{
      alert("The email and password is not valid")
    }*/
  }
}