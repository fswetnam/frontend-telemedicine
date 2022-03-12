import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MessageService } from "./message.service"

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

    @ViewChild('messageInput') input; 

    constructor(private messageService: MessageService) {
        this.messages = this.getMessages();
        this.messageThreads = this.getMessageThreads();
    }

    ngOnInit(): void {
    }

    get f(){
        return this.form.controls;
    }

    getSenderId() {
        return "90"
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
     * @returns array of all messages
     */
    getMessages() {
        console.log(this.messageService.getMessages(2))
        return [
            {
                sender_id: 23,
                receiver_id: 88,
                date: '2022-03-12 08:34:12',
                message: "This is a test"
            },
            {
                sender_id: 23,
                receiver_id: 88,
                date: '2022-03-12 08:45:29',
                message: "Coming back"
            }
        ]
    }
    
    /**
     * Adds new message to chat
     */
    submit(){
        let d = new Date();
        let message = {
            sender_id: this.getSenderId(),
            receiver_id: this.getRecieverId(),
            date: d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            message: this.form.value.message
        }
        this.messageService.saveMessage(message)
        this.messages.push(message)
        this.input.nativeElement.value = ''
    }
}