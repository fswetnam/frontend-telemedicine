import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patientp',
  templateUrl: './patientp.component.html',
  styleUrls: ['./patientp.component.css']
})
export class PatientpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myApp(){
    window.location.href="sapp"
  }

  myMed(){
    window.location.href="prescription"
  }

}