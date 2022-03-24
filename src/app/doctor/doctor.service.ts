import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../appointment/Appointment";
import { Patient } from "../patient/Patient";
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

    public getPatients(id: number): Observable<Patient[]>{
        return this.http.get<Patient[]>(`${this.url}/id=${id}/patients`);
    }

    public addPatient(id: number, patient: Patient){
        return this.http.put(`${this.url}/id=${id}/patients`, patient);
    }

     getAppointments(id: number): Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${this.url}/id=${id}/appointments`)
    }

    public deleteDoctor(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateDoctor(doctor: Doctor, id: number) {
        return this.http.put(`${this.url}/id=${id}`, doctor, {responseType: 'text' as 'json'});
    }
}