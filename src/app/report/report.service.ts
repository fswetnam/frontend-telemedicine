import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Report } from "./Report";

@Injectable({providedIn: 'root'})
export class ReportService{
    
    public url = "http://localhost:8080/report";

    constructor(private http: HttpClient){}

    getReports(): Observable<Report[]>{
        return this.http.get<Report[]>(`${this.url}s`);
     }

    getURL(id: number): Observable<any>{
        return this.http.get<any>(`${this.url}/id=${id}/url`);
    }

    getReport(id: number): Observable<Report>{
        return this.http.get<Report>(`${this.url}/id=${id}`)
    }

    public saveReport(file: File, id: number): Observable<Blob>{
        const formData: FormData = new FormData;
        formData.append('file', file);
        return this.http.post(`${this.url}/userId=${id}`, formData, {responseType: 'blob'});
     }

    public sendReport(id: number, report: Report) {
        return this.http.put(`${this.url}/userId=${id}`, report);
    }

    public downloadReport(id: number){
        return this.http.get(`${this.url}/download/id=${id}`);
    }

    public deleteReport(id: number, userId: number){
        return this.http.put(`${this.url}/id=${id}/remove-report`, userId,{responseType: 'text' as 'json'});
    }

    public updateReport(report: Report, id: number) {
        return this.http.put(`${this.url}/id=${id}`, report, {responseType: 'text' as 'json'});
    }
}