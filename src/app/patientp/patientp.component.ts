import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patientp',
  templateUrl: './patientp.component.html',
  styleUrls: ['./patientp.component.css']
})
export class PatientpComponent implements OnInit {

  constructor() { }


  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
  }
}
  /**myApp(){
    window.location.href="sapp"
  }

  myMed(){
    window.location.href="prescription"
  }*/

