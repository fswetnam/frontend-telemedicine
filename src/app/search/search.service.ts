import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SearchService{
    
    public messageUrl = "http://localhost:8080/message/";
 
    constructor(private http: HttpClient){}

}