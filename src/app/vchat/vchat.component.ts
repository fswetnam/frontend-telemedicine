import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vchat',
  templateUrl: './vchat.component.html',
  styleUrls: ['./vchat.component.css']
})
export class VchatComponent implements OnInit {

  constructor(){}

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