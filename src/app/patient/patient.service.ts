import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
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