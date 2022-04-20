import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { User } from '../user/User';
import { UserSession } from '../user/UserSession';
import { UserType } from '../enumeration/UserType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit  {

    private loginUrl = 'http://localhost:8080/login'

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.minLength(1)]),
        password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    messageThreads = []
    messages = []

    @ViewChild('emailInput') emailInput;
    @ViewChild('passwordInput') passwordInput;

    response:any;
    constructor(private http: HttpClient){}

    ngOnInit(): void {
    }

    get f(){
        return this.form.controls;
    }
    public generateToken(request){
      return this.http.post('http://localhost:8080/authenticate',request,{responseType: 'text'as 'json'});
    }
    public getAccessToken(authRequest){
      let resp = this.generateToken(authRequest);
      resp.subscribe(data=>localStorage.setItem("Token" , JSON.stringify(data)));
    }
    submit() {
        console.log(this.form.value.email)
        console.log(this.form.value.password)
      let authDetails = {
            userName: this.form.value.email,
            userpassword: this.form.value.password
        }

        this.getAccessToken(authDetails);


        this.http.post(`${this.loginUrl}`, authDetails, {responseType: 'text' as 'json'}).subscribe((data) => {
            UserSession.setUserSession(data)
            let user = UserSession.getUserSession();
            if(user.userType === "PATIENT"){
                window.location.href="patientp";
            } else if(user.userType === "DOCTOR"){
                window.location.href="doctorp";
            } else if(user.userType == "ADMIN"){
                window.location.href="adminp";
            }
        }, (error) => {
            let errorMsg = JSON.parse(error.error)
            alert(errorMsg.message)
        });


    }
}
