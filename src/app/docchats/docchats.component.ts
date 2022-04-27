import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MessageService } from "../message/message.service"
import { UserSession } from '../user/UserSession';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';

@Component({
  selector: 'app-docchats',
  templateUrl: './docchats.component.html',
  styleUrls: ['./docchats.component.css']
})
export class DocchatsComponent implements OnInit {

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  activeMessageThread = []
  messages = []
  user = null
  patients!: Patient[]
  patient: Patient

  @ViewChild('messageInput') input; 

  constructor(private messageService: MessageService, private patientService: PatientService) {
    this.user = UserSession.getUserSession();
    this.getMessages();
    this.getPatient();
  }

  selectPatient(event, patient) {
    this.patient = patient;
    this.activeMessageThread = this.messages.filter(message => (message.receiver_id == patient.id) || (message.sender_id === patient.id))
    for(let i=0; i < document.getElementsByClassName("patient-select").length; i++) {
        let item = document.getElementsByClassName("patient-select").item(i);
        item.className="list-group-item list-group-item-action patient-select"
    }
    document.getElementById("patient-"+patient.id).className="active list-group-item list-group-item-action patient-select"
  }

  getPatient(){
      this.patientService.getPatients().subscribe((data: Patient[]) => {
        this.patients = data;
      });
    }

  get f(){
      return this.form.controls;
  }

  getSenderId() {
      return this.user.id
  }

  getRecieverId() {
      return "" + this.patient.id
  }

  isUserMessage(message) {
      return message.sender_id == this.user.id
  }

  isPatientMessage(message) {
      return message.receiver_id == this.user.id
  }

  /**
   * Fetched messagesd that have already been sent
   */
  getMessages() {
    this.messages = [];
    this.messageService.getMessages(this.user.id).subscribe((message: Message[]) =>{
        message.forEach(m =>{
            if(m.messageType == MessageType.CHAT){
                this.messages.push(m);
            }
        });
    });
  }

  /**
   * Adds new message to chat
   */
  submit(){
      let d = new Date();
      let message = <Message>{
          sender_id: this.getSenderId(),
          receiver_id: this.getRecieverId(),
          date: null,
          content: this.form.value.message,
          time: null,
          messageType: MessageType.CHAT,
          subject: null,
          viewed: null
      }
      this.messageService.saveMessage(message).forEach(m => m)
      this.messages.push(message)
      this.activeMessageThread.push(message)
      this.input.nativeElement.value = ''
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
  }

}