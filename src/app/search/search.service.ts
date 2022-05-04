import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class SearchService{
    
    public searchUrl = "http://localhost:8080/search/";
 
    constructor(private http: HttpClient){}

    searchTerm(term) {
        return this.http.get(`${this.searchUrl}` + term);
    }

}