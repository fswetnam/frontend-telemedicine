import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminp',
  templateUrl: './adminp.component.html',
  styleUrls: ['./adminp.component.css']
})
export class AdminpComponent implements OnInit {

  constructor() { }


  openNav(){
    document.getElementById("mysideBar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
  }

}