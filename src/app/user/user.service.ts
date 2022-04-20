import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./User";


@Injectable({providedIn: 'root'})
export class UserService{
    
    public url = "http://localhost:8080/user";
    public registerUrl = "http://localhost:8080/register"

    constructor(private http: HttpClient){}

    getUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${this.url}` + 's');
     }

    public saveUser(user: User) {
         return this.http.post(`${this.url}`, user, {responseType: 'text' as 'json'});
     }

    public deleteUser(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateUser(user: User, id: number) {
        return this.http.put(`${this.url}/id=${id}`, user, {responseType: 'text' as 'json'});
    }

    public createNewUser(user: User) {
        return this.http.post(`${this.registerUrl}`, user, {responseType: 'text' as 'json'});
    }

    public getVideoChatRoomIdByDoctor(doctor_id, patient_id) {
        return this.http.get("http://localhost:8080/video-chat-room/" + doctor_id + "/" + patient_id);
    }
}