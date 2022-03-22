import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient} from "@angular/common/http";
import { User } from '../user/User';

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

    constructor(private http: HttpClient){}

    ngOnInit(): void {
    }

    get f(){
        return this.form.controls;
    }
    
    submit() {
        console.log(this.form.value.email)
        console.log(this.form.value.password)
        let authDetails = {
            email: this.form.value.email,
            password: this.form.value.password
        }

        // Send password to server;
        let resp = this.http.post(`${this.loginUrl}`, authDetails, {responseType: 'text' as 'json'});

        console.log(resp)

        // If success store user in browser session

        // If fail alert user login failed
    }
}