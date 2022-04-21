import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dbox',
  templateUrl: './doctorbox.component.html',
  styleUrls: ['./doctorbox.component.css']
})
export class dBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
