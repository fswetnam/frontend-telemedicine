import { Component, OnInit } from '@angular/core';
import { User } from '../user/User';
import {UserService} from "../user/user.service";
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  user: any;
  constructor( ) { }

  ngOnInit() {
  }

  myReturn(){
    window.location.href="patientp"
  }

  
}
