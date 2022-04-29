import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../admin/admin.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { User } from '../user/User';
import { UserService } from '../user/user.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-dbox',
  templateUrl: './doctorbox.component.html',
  styleUrls: ['./doctorbox.component.css']
})
export class dBoxComponent implements OnInit {
  received_messages = [];
  sent_messages = [];
  user: Doctor;
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
  

  constructor(private doctorService: DoctorService, private messageService: MessageService, private adminService: AdminService, private userService: UserService) { }

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
          this.sent_messages.forEach(s =>{
            
          })
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
    if(type === "received"){
      this.userService.getUser(m.sender_id).subscribe((data1: User)=>{
      this.viewEmail = data1.email;
      this.viewSubject = m.subject;
      this.viewContent = m.content;
      this.messageService.viewedMessage(m).subscribe((data)=>{
      console.log('viewed');
      });
    });
  } else {
    this.userService.getUser(m.receiver_id).subscribe((data2: User)=>{
      this.viewEmail = data2.email;
      this.viewSubject = m.subject;
      this.viewContent = m.content;
    });
  }

  }

  closeView(){
    this.viewEmail = "";
    this.viewSubject = "";
    this.viewContent = "";
  }

  setContent(content: string){
    if(content.length > 25){
      this.content = content.substring(1, 25);
      console.log(this.content);
    }
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
