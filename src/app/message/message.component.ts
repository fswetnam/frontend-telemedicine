import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MessageService } from "./message.service"
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit  {

    form = new FormGroup({
        message: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    messageThreads = []
    messages = []
    user = null;

    @ViewChild('messageInput') input; 

    constructor(private messageService: MessageService) {
        this.user = UserSession.getUserSession();
        this.getMessages();
        this.messageThreads = this.getMessageThreads();
    }

    ngOnInit(): void {
    }

    get f(){
        return this.form.controls;
    }

    getSenderId() {
        return this.user.id
    }

    getRecieverId() {
        return "88"
    }

    getMessageThreads() {
        return [
            {
                name: "Will",
                receiver_id: 26
            },
            {
                name: "Aubrey",
                receiver_id: 88
            },
            {
                name: "Scout",
                receiver_id: 12
            },
            {
                name: "Gooby",
                receiver_id: 3
            },
        ]
    }

    /**
     * Fetched messagesd that have already been sent
     */
    getMessages() {
        this.messageService.getMessages(this.user.id).subscribe(message => this.messages = message);
    }
    
    /**
     * Adds new message to chat
     */
    submit(){
        let d = new Date();
        let message = {
            sender_id: this.getSenderId(),
            receiver_id: this.getRecieverId(),
            date: null,
            content: this.form.value.message,
            time: null
        }
        this.messageService.saveMessage(message).forEach(m => m)
        this.messages.push(message)
        this.input.nativeElement.value = ''
    }
}