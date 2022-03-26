import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docinbox',
  templateUrl: './docinbox.component.html',
  styleUrls: ['./docinbox.component.css']
})
export class DocinboxComponent implements OnInit {

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