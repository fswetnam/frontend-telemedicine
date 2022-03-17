import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user/user.service";
import {LoginuserService} from "../loginuser.service";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  user:User = new User();
  constructor(private loginuserservice: LoginuserService) { }

  ngOnInit() {
  }

  myReturn(){

    window.location.href="patientp"

    /*
    var em = document.forms["myForm"]["email"].value;
    var ps = document.forms["myForm"]["psw"].value;
    if(em =="happychaos@gmail.com" && ps =="06112021"){
      window.location.href="patientp"
    }else{
      alert("The email and password is not valid")
    }*/
  }

  userLogin() {
    console.log(this.user)
    this.loginuserservice.loginUser(this.user).subscribe(data=>{
      alert("Login Success")
    },error=>alert("Please enter correct Username and password"));
  }
}
