import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { UserType } from '../enumeration/UserType';
import { Patient } from '../patient/Patient';
import { User } from '../user/User';
import { UserService } from '../user/user.service';
import { UserSession } from '../user/UserSession';
import { PatientService } from '../patient/patient.service';

@Component({
  selector: 'app-vchat',
  templateUrl: './vchat.component.html',
  styleUrls: ['./vchat.component.css']
})
export class VchatComponent implements OnInit {

  patients!: Patient[]
  patient: Patient
  doctors!: Doctor[]
  doctor: Doctor
  user:User = null
  videoChat = null
  videoIframe = "Hello"
  isPatient = false

  constructor(private doctorService: DoctorService, private patientService: PatientService, private userService: UserService) {
    this.user = UserSession.getUserSession();
    if(this.user.userType == UserType.PATIENT) {
      this.isPatient = true
      this.getDoctors();
    } else {
      this.isPatient = false
      this.getPatients();
    }
  }

  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  
  getDoctors(){
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }
  
  selectDoctor(event, doctor) {
    let patient = UserSession.getUserSession();
    this.userService.getVideoChatRoomIdByDoctor(doctor.id, patient.id).subscribe((data) => {
      this.videoChat = data
      const iframe =  document.getElementById('embeddedPage') as HTMLIFrameElement;
      //'07db8b78-4cca-48fc-bc4e-f36633bc7cb1'
      iframe.width = '800px'
      iframe.height = '640px'
      iframe.contentWindow.location.replace('https://tokbox.com/embed/embed/ot-embed.js?embedId='+'07db8b78-4cca-48fc-bc4e-f36633bc7cb1'+'&room='+ 'group' + this.videoChat.id +'&iframe=true');
    })
    for(let i=0; i < document.getElementsByClassName("doctor-select").length; i++) {
      let item = document.getElementsByClassName("doctor-select").item(i);
      item.className="list-group-item list-group-item-action doctor-select"
  }
  document.getElementById("doctor-"+doctor.id).className="active list-group-item list-group-item-action doctor-select"
  }

  getPatients() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data
    })
  }

  selectPatient(event, patient) {
    let doctor =  UserSession.getUserSession();
    this.userService.getVideoChatRoomIdByDoctor(doctor.id, patient.id).subscribe((data) => {
      this.videoChat = data
      const iframe =  document.getElementById('embeddedPage') as HTMLIFrameElement;
      //'07db8b78-4cca-48fc-bc4e-f36633bc7cb1'
      iframe.width = '800px'
      iframe.height = '640px'
      iframe.contentWindow.location.replace('https://tokbox.com/embed/embed/ot-embed.js?embedId='+'07db8b78-4cca-48fc-bc4e-f36633bc7cb1'+'&room='+ 'group' + this.videoChat.id +'&iframe=true');
    })
    for(let i=0; i < document.getElementsByClassName("patient-select").length; i++) {
      let item = document.getElementsByClassName("patient-select").item(i);
      item.className="list-group-item list-group-item-action patient-select"
    }
    document.getElementById("patient-"+patient.id).className="active list-group-item list-group-item-action patient-select"
  }

  ngOnInit() {
  }


}