import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { User } from "./User";
import { UserService } from "./user.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
    patientState = new BehaviorSubject<User>(null);
    patient$ = this.patientState.asObservable().subscribe();
    users!: User[];
    user!: User;
    message: any;
    constructor(private userService: UserService) {}

    ngOnInit(): void {
       this.getUsers();
    }

    public getUsers(){
        this.userService.getUsers().subscribe((data: User[]) => {
            console.log(data);
            this.users = data;
        });
    }

    public save(form: NgForm){
        const response =  this.userService.saveUser(form.value as User).subscribe((data) => {
            this.message = data
            this.getUsers();
            form.reset();
        });
        return response;
    }

    public delete(user: User){
        this.userService.deleteUser(user.id).subscribe((data) => {
            this.message = data
            this.getUsers();
        });
    }

    public update(form: NgForm){
        const response = this.userService.updateUser(form.value as User, this.user.id).subscribe((data) => {
            this.message = data
            this.getUsers();
            form.reset();
        });
        return response;
    }

    public setUser(user: User){
        console.log(user);
        this.user = user;
    }
} 