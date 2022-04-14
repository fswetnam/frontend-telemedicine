import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment } from "../appointment/Appointment";
import { Doctor } from "../doctor/Doctor";
import { Patient } from "../patient/Patient";
import { Requests } from "./Requests";

@Injectable({providedIn: 'root'})
export class RequestService{
    
    public url = "http://localhost:8080/request"

    constructor(private http: HttpClient){}

    getRequests(): Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.url}` + 's');
     }

    public saveRequest(request: Requests) {
         return this.http.post(`${this.url}`, request, {responseType: 'text' as 'json'});
     }

    public getDoctor(id: number): Observable<Doctor>{
        return this.http.get<Doctor>(`${this.url}/id=${id}/doctor`);
     }

    public getPatient(id: number): Observable<Patient>{
        return this.http.get<Patient>(`${this.url}/id=${id}/patient`);
     }

     public getAppointmentRequest(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(`${this.url}/id=${id}/appointment`);
     }

     public getRequestsByPatient(patient: Patient): Observable<Requests[]> {
         return this.http.put<Requests[]>(`${this.url}/patient`, patient, {responseType: 'text' as 'json'});
     }

     public getRequestByAppointment(appointment: Appointment): Observable<Requests> {
        return this.http.put<Requests>(`${this.url}/appointment`, appointment);
     }

    public deleteRequest(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateRequest(request: Requests, id: number) {
        return this.http.put(`${this.url}/id=${id}`, request, {responseType: 'text' as 'json'});
    }
}