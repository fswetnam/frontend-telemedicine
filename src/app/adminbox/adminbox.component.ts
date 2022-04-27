import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from '../admin/Admin';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { User } from '../user/User';
import { UserService } from '../user/user.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-abox',
  templateUrl: './adminbox.component.html',
  styleUrls: ['./adminbox.component.css']
})
export class aBoxComponent implements OnInit {

  received_messages = [];
  sent_messages = [];
  user: Admin;
  senderId = null;
  receiverId = null;
  received=false;
  sent=false;
  recieverName = [];
  sentName = [];
  viewEmail: string;
  viewSubject: string;
  viewContent: string;
  content: string;

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.user = UserSession.getUserSession();
    this.getMessages();
  }

   /**
     * Fetched messagesd that have already been sent
     */
    getMessages() {
      this.received_messages = [];
      this.sent_messages = [];
      this.recieverName = [];
      this.sentName = [];
      this.messageService.getMessages(this.user.id).subscribe((message: Message[]) =>{
          message.forEach((m, index) =>{
              if(m.messageType == MessageType.EMAIL){
                if(m.sender_id == this.user.id.toString()){
                  this.sent_messages[index] = (m);
                  this.userService.getUser(m.receiver_id).subscribe((data:User)=> {
                      this.recieverName[index] = data.fname + " " + data.lname;
                  })
                  this.sent=true;
                } else {
                  this.received_messages[index] = (m);
                  this.userService.getUser(m.sender_id).subscribe((data:User)=> {
                    this.sentName[index] = data.fname + " " + data.lname;
                  })
                  this.received=true;
                }
                  
              }
          });
      });
  }
  
  /**
   * Adds new message to chat
   */
  submit(form: NgForm){
    this.userService.getUserByEmail(form.value.remail).subscribe((data1: User)=>{
      this.receiverId = data1.id;

      let d = new Date();
      let message = <Message>{
          sender_id: this.user.id.toString(),
          receiver_id: this.receiverId,
          date: null,
          content: form.value.content,
          time: null,
          messageType: MessageType.EMAIL,
          subject: form.value.subject,
          viewed: null
      }
      this.messageService.saveMessage(message).forEach(m => m)
      window.location.reload();
    })
     
  }

  
  setMessage(m: Message, type: string){
    this.userService.getUser(m.receiver_id).subscribe((data1: User)=>{
      this.viewEmail = data1.email;
      this.viewSubject = m.subject;
      this.viewContent = m.content;
      if(type === "received"){
        this.messageService.viewedMessage(m).subscribe((data)=>{
          console.log('viewed');
        });
      }
    });
  }

  closeView(){
    this.viewEmail = "";
    this.viewSubject = "";
    this.viewContent = "";
  }

  /*
  Delete needs work will come back to it later if I have time (Faith)
  deleteMessage(message: Message){
    this.messageService.deleteMessage(message.id, this.user.id).subscribe((data)=>{
      this.getMessages();
      if(this.sent_messages.length === 0){
        this.sent = false;
      }
      if(this.received_messages.length === 0){
        this.received = false;
      }
    });
  }
*/
  
  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

}

