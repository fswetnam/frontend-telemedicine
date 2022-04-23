import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwIfEmpty } from 'rxjs';
import { Admin } from '../admin/Admin';
import { AdminService } from '../admin/admin.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { Patient } from '../patient/Patient';
import { User } from '../user/User';
import { UserService } from '../user/user.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-pbox',
  templateUrl: './pbox.component.html',
  styleUrls: ['./pbox.component.css']
})
export class pBoxComponent implements OnInit {

  received_messages = [];
  sent_messages = [];
  user: Patient;
  senderId = null;
  receiverId = null;
  received=false;
  sent=false;
  recieverName = [];
  sentName = [];

  constructor(private doctorService: DoctorService, private messageService: MessageService, private adminService: AdminService, private userService: UserService) { }

  ngOnInit() {
    this.user = UserSession.getUserSession();
    this.getMessages();
    console.log(this.recieverName);
    console.log(this.sentName);
    console.log(this.sent_messages);
    console.log(this.received_messages);
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
                  this.received_messages[index] =(m);
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
      this.userService.getUserByEmail(form.value.uemail).subscribe((data: User)=>{
        this.senderId = data.id;
        this.userService.getUserByEmail(form.value.remail).subscribe((data1: User)=>{
          this.receiverId = data1.id;

          let d = new Date();
          let message = {
              sender_id: this.senderId,
              receiver_id: this.receiverId,
              date: null,
              content: form.value.content,
              time: null,
              messageType: MessageType.EMAIL,
              subject: form.value.subject
          }
          this.messageService.saveMessage(message).forEach(m => m)
          window.location.reload();
        })
      })
     
  }

  
  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

}
