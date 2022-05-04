import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Message } from "./message";

@Injectable({providedIn: 'root'})
export class MessageService{
    
    public messageUrl = "https://glacial-dusk-86085.herokuapp.com/message/";
    public messagesUrl = "https://glacial-dusk-86085.herokuapp.com/messages/";

    constructor(private http: HttpClient){}

    getMessages(id): Observable<Message[]>{
        return this.http.get<Message[]>(`${this.messagesUrl}` + 'sender_id=' + id);
     }

    public saveMessage(message: Message) {
        console.log(message)
        return this.http.post(`${this.messageUrl}`, message, {responseType: 'text' as 'json'});
     }

     viewedMessage(message: Message){
         return this.http.put(`${this.messageUrl}viewed`, message, {responseType: 'text' as 'json'})
     }

     deleteMessage(id: number, userId: number){
         return this.http.delete(`${this.messageUrl}id=${id}/userId=${userId}`);
     }
}