import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-precords',
  templateUrl: './precords.component.html',
  styleUrls: ['./precords.component.css']
})
export class PrecordsComponent implements OnInit {

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