import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadrep',
  templateUrl: './uploadrep.component.html',
  styleUrls: ['./uploadrep.component.css']
})
export class UploadrepComponent implements OnInit {

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