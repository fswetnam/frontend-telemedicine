import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Doctor } from "../doctor/Doctor";
import { Patient } from "../patient/Patient";
import { Appointment } from "./Appointment";

@Injectable({providedIn: 'root'})
export class AppointmentService{
    
    public url = "https://glacial-dusk-86085.herokuapp.com/appointment";

    constructor(private http: HttpClient){}

    getAppointments(): Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${this.url}` + 's');
     }

    getAppointmentPatient(id: number): Observable<Patient>{
        return this.http.get<Patient>(`${this.url}/patient/id=${id}`);
    }

    
    getAppointmentDoctor(id: number): Observable<Doctor>{
        return this.http.get<Doctor>(`${this.url}/doctor/id=${id}`);
    }

    public saveAppointment(appointment: Appointment) {
         return this.http.post(`${this.url}`, appointment, {responseType: 'text' as 'json'});
     }

    public deleteAppointment(id: number){
        return this.http.delete(`${this.url}/id=${id.valueOf()}`);
    }

    public updateAppointment(appointment: Appointment, id: number) {
        return this.http.put(`${this.url}/id=${id}`, appointment, {responseType: 'text' as 'json'});
    }
}