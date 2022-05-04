import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Doctor } from "../doctor/Doctor";
import { Patient } from "../patient/Patient";
import { Prescription } from "./Prescription";

@Injectable({providedIn: 'root'})
export class PrescriptionService{
    
    public url = "http://localhost:8080/prescription";

    constructor(private http: HttpClient){}

    getPrescriptions(): Observable<Prescription[]>{
        return this.http.get<Prescription[]>(`${this.url}` + 's');
     }

    public getDoctor(id: number): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.url}/id=${id}/doctor`);
    }

    public getPatient(id: number): Observable<Patient> {
        return this.http.get<Patient>(`${this.url}/id=${id}/patient`);
    }

    public savePrescription(prescription: Prescription) {
         return this.http.post(`${this.url}`, prescription, {responseType: 'text' as 'json'});
     }

    public deletePrescription(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updatePrescription(prescription: Prescription, id: number) {
        return this.http.put(`${this.url}/id=${id}`, prescription, {responseType: 'text' as 'json'});
    }
}