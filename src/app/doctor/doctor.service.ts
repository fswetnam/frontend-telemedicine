import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Address } from "../address/Address";
import { Appointment } from "../appointment/Appointment";
import { Patient } from "../patient/Patient";
import { Prescription } from "../prescription/Prescription";
import { Report } from "../report/Report";
import { Requests } from "../requests/Requests";
import { Doctor } from "./Doctor";

@Injectable({providedIn: 'root'})
export class DoctorService{
    
    public url = "http://localhost:8080/doctor";

    constructor(private http: HttpClient){}

    getDoctors(): Observable<Doctor[]>{
        return this.http.get<Doctor[]>(`${this.url}` + 's');
     }

    getDoctor(id: number): Observable<Doctor>{
        return this.http.get<Doctor>(`${this.url}/id=${id}`);
    }

    getPrescriptions(id: number): Observable<Prescription[]>{
        return this.http.get<Prescription[]>(`${this.url}/id=${id}/prescribed-prescriptions`);
    }

    getRequests(id: number): Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.url}/id=${id}/requests`);
    }

    getOfficeAddress(id: number): Observable<Address>{
        return this.http.get<Address>(`${this.url}/id=${id}/address`);
    }

    getReportIds(id: number): Observable<number[]>{
        return this.http.get<number[]>(`${this.url}/id=${id}/reports`);
    }

    addOfficeAddress(id: number, address: Address){
            return this.http.put(`${this.url}/id=${id}/add-address`, address, {responseType: 'text' as 'json'})
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