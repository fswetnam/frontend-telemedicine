import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { MedicalHistory } from "./MedicalHistory";

@Injectable({providedIn: 'root'})
export class MedicalHistoryService{
    
    public url = "https://glacial-dusk-86085.herokuapp.com/medical_history";

    constructor(private http: HttpClient){}

    getMedicalHistory(): Observable<MedicalHistory[]>{
        return this.http.get<MedicalHistory[]>("http://localhost:8080/medical_histories");
     }

    public saveMedicalHistory(medicalHistory: MedicalHistory) {
         return this.http.post(`${this.url}`, medicalHistory, {responseType: 'text' as 'json'});
     }

    public deleteMedicalHistory(id: number){
        return this.http.delete(`${this.url}/id=${id}`);
    }

    public updateMedicalHistory(medicalHistory: MedicalHistory, id: number) {
        return this.http.put(`${this.url}/id=${id}`, medicalHistory, {responseType: 'text' as 'json'});
    }
}