import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sapp',
  templateUrl: './sapp.component.html',
  styleUrls: ['./sapp.component.css']
})
export class SappComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myAppoint(){
  var myDoc = document.forms["myApp"]["doctors"].value;
  var myDate = document.forms["myApp"]["date"].value;
  var myTime = document.forms["myApp"]["time"].value;
  if(myDoc == "doc0"){
    alert("Please select a doctor!")
  }else if (myDate == ""){
    alert("Please select a date!")
  }else if (myTime == ""){
    alert("Please select a time!")
  }else{
    alert("Appointment has been set!")
    window.location.href="patientp"
  }
}
}