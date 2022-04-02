import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Appointment } from "../appointment/Appointment";
import { Prescription } from "../prescription/Prescription";
import { Requests } from "../requests/Requests";
import { Patient } from "./Patient";

@Injectable({providedIn: 'root'})
export class PatientService{
    
    public url = "http://localhost:8080/patient";

    constructor(private http: HttpClient){}

    getPatients(): Observable<Patient[]>{
        return this.http.get<Patient[]>(`${this.url}` + 's');
     }

    getPatient(id: number): Observable<Patient>{
        return this.http.get<Patient>(`${this.url}/id=${id}`);
    }

    getAppointments(id: number): Observable<Appointment[]>{
        return this.http.get<Appointment[]>(`${this.url}/id=${id}/appointments`)
    }

    getPrescriptions(id: number): Observable<Prescription[]>{
        return this.http.get<Prescription[]>(`${this.url}/id=${id}/prescriptions`)
    }

    getRequestedPrescriptions(id: number): Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.url}/id=${id}/requested-prescriptions`);
    }

    updatePrescription(id: number, p: Prescription){
        return this.http.put(`${this.url}/id=${id}/prescriptions-update`, p)
    }

    public savePatient(patient: Patient) {
         return this.http.post(`${this.url}`, patient, {responseType: 'text' as 'json'});
     }

    public deletePatient(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updatePatient(patient: Patient, id: number) {
        return this.http.put(`${this.url}/id=${id}`, patient, {responseType: 'text' as 'json'});
    }
}