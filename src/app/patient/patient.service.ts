import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Address } from "../address/Address";
import { Appointment } from "../appointment/Appointment";
import { Insurance } from "../insurance/Insurance";
import { MedicalHistory } from "../medicalHistory/MedicalHistory";
import { Prescription } from "../prescription/Prescription";
import { Report } from "../report/Report";
import { Requests } from "../requests/Requests";
import { Patient } from "./Patient";

@Injectable({providedIn: 'root'})
export class PatientService{
    
    public url = "https://glacial-dusk-86085.herokuapp.com/patient";

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

    getAddress(id: number): Observable<Address>{
        return this.http.get<Address>(`${this.url}/id=${id}/address`);
    }

    addAddress(id: number, address: Address){
            return this.http.put(`${this.url}/id=${id}/add-address`, address, {responseType: 'text' as 'json'})
        }
    addInsurance(id: number, insurance: Insurance){
        return this.http.put(`${this.url}/id=${id}/add-insurance`, insurance, {responseType: 'text' as 'json'})
    }

    getInsurance(id: number): Observable<Insurance[]>{
        return this.http.get<Insurance[]>(`${this.url}/id=${id}/insurance`);
    }

    addMedicalHistory(id: number, mH: MedicalHistory){
        return this.http.put(`${this.url}/id=${id}/add-medical-history`, mH, {responseType: 'text' as 'json'})
    }

    getMedicalHistory(id: number): Observable<MedicalHistory[]>{
        return this.http.get<MedicalHistory[]>(`${this.url}/id=${id}/medical-history`);
    }

    getRequests(id: number): Observable<Requests[]>{
        return this.http.get<Requests[]>(`${this.url}/id=${id}/requests`);
    }

    updatePrescription(id: number, p: Prescription){
        return this.http.put(`${this.url}/id=${id}/prescriptions-update`, p)
    }

    getReportIds(id: number): Observable<number[]>{
        return this.http.get<number[]>(`${this.url}/id=${id}/reports`);
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