import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Requests } from "../requests/Requests";
import { Admin } from "./Admin";

@Injectable({providedIn: 'root'})
export class AdminService{
    
    public url = "http://localhost:8080/admin";

    constructor(private http: HttpClient){}

    getAdmins(): Observable<Admin[]>{
        return this.http.get<Admin[]>(`${this.url}` + 's');
     }

    getAdmin(id: number): Observable<Admin>{
        return this.http.get<Admin>(`${this.url}/id=${id}`);
    }

    public saveAdmin(admin: Admin) {
         return this.http.post(`${this.url}`, admin, {responseType: 'text' as 'json'});
     }

     getAppointments(id: number): Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.url}/id=${id}/requests`)
    }

    public deleteAdmin(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateAdmin(admin: Admin, id: number) {
        return this.http.put(`${this.url}/id=${id}`, admin, {responseType: 'text' as 'json'});
    }
}