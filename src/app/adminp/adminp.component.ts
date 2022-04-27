import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin/Admin';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-adminp',
  templateUrl: './adminp.component.html',
  styleUrls: ['./adminp.component.css']
})
export class AdminpComponent implements OnInit {

  user: Admin;
  messages: number;
  unReadFound = false;

  constructor(private messageService: MessageService) { }

  getMessages() {
    this.messages = 0;
    this.messageService.getMessages(this.user.id).subscribe((message: Message[]) =>{
        message.forEach((m, index) =>{
          if(m.receiver_id == this.user.id.toString()){
            if(m.messageType == MessageType.EMAIL){
              if(!m.viewed){
                this.messages++;
                this.unReadFound = true;
              }
            }
          }
        });
    });
}

  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
    this.user = UserSession.getUserSession();
    this.getMessages();
  }

}