import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Message } from "./message";

@Injectable({providedIn: 'root'})
export class MessageService{
    
    public url = "http://localhost:8080/message";

    constructor(private http: HttpClient){}

    getMessages(id): Observable<Message[]>{
        return this.http.get<Message[]>(`${this.url}` + 'id=' + id);
     }

    public saveMessage(message: Message) {
         return this.http.post(`${this.url}`, message, {responseType: 'text' as 'json'});
     }
}