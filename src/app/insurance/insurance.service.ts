import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Insurance } from "./Insurance";

@Injectable({providedIn: 'root'})
export class InsuranceService{
    
    public url = "http://localhost:8080/insurance";

    constructor(private http: HttpClient){}

    getInsurances(): Observable<Insurance[]>{
        return this.http.get<Insurance[]>(`${this.url}` + 's');
     }

    public saveInsurance(insurance: Insurance) {
         return this.http.post(`${this.url}`, insurance, {responseType: 'text' as 'json'});
     }

    public deleteInsurance(id: number){
        return this.http.delete(`${this.url}` + "/id=" + `${id}`);
    }

    public updateInsurance(insurance: Insurance, id: number) {
        return this.http.put(`${this.url}` + "/id=" + `${id}`, insurance, {responseType: 'text' as 'json'});
    }
}