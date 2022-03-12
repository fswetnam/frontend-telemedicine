import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "./Doctor";

@Injectable({providedIn: 'root'})
export class DoctorService{
    
    public url = "http://localhost:8080/doctor";

    constructor(private http: HttpClient){}

    getDoctors(): Observable<Doctor[]>{
        return this.http.get<Doctor[]>(`${this.url}` + 's');
     }

    public saveDoctor(doctor: Doctor) {
         return this.http.post(`${this.url}`, doctor, {responseType: 'text' as 'json'});
     }

    public deleteDoctor(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateDoctor(doctor: Doctor, id: number) {
        return this.http.put(`${this.url}/id=${id}`, doctor, {responseType: 'text' as 'json'});
    }
}