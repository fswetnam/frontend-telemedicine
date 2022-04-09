import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadRepAdmin',
  templateUrl: './uploadRepAdmin.component.html',
  styleUrls: ['./uploadRepAdmin.component.css']
})
export class UploadRepAdmin implements OnInit {

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