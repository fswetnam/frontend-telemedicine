import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from '../admin/Admin';
import { AdminService } from '../admin/admin.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { MessageType } from '../enumeration/MessageType';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { Report } from '../report/Report';
import { ReportService } from '../report/report.service';
import { UserSession } from '../user/UserSession';

@Component({
  selector: 'app-uploadRepAdmin',
  templateUrl: './uploadRepAdmin.component.html',
  styleUrls: ['./uploadRepAdmin.component.css']
})
export class UploadRepAdmin implements OnInit {

  admin: Admin;
  reports: Report[] = [];
  report!: Report;
  patients!: Patient[];
  doctors!: Doctor[];

  selectedFiles?: FileList;
  currentFile?: File;
  repLength = 0;



  constructor(private doctorService: DoctorService, private reportService: ReportService, 
    private patientService: PatientService, private adminService: AdminService,
    private http: HttpClient, private messageService: MessageService) { }


  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
    this.admin = UserSession.getUserSession();
    this.getReports();
    this.getPatients();
    this.getDoctors();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  getReports(){
    this.reports = [];
    this.repLength = 0;
    this.reportService.getReports().subscribe((data: Report[])=>{
      console.log(data);
      this.adminService.getReportIds(this.admin.id).subscribe((repIds) => {
        console.log(repIds);
        data.forEach(rep => {
          repIds.forEach(id =>{
            if(rep.id == id){
              this.reports.push(rep);
              this.repLength++;
            }
          })
        })
      })
      console.log(this.reports);
    })
  }

  downloadReport(id: number){
    this.reportService.getURL(id).subscribe((data: string)=>{
      var a = document.createElement('a');
      a.href = data;
      a.click();
    })
  }

  /*

  validateUser(form: NgForm) {
    let authDetails = {
        email: form.value.email,
        password: form.value.password
    }

    this.http.post('http://localhost:8080/login', authDetails, {responseType: 'text' as 'json'}).subscribe((data: User) => {
      console.log(data.id);
      console.log(UserSession.getUserSession().id);
        if(data.id == UserSession.getUserSession().id){
          var a = document.createElement('a');
          a.href = this.report.url;
          a.click();
          form.reset(); 
        } else {
          form.reset();
          alert("Invalid login!")
        }
    }, (error) => {
        let errorMsg = JSON.parse(error.error)
        form.reset();
        alert(errorMsg.message)
    });

   
}

*/

  public getPatients(){
    this.patientService.getPatients().subscribe((data: Patient[]) => {
        this.patients = data;
    });
  }

  public getDoctors(){
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
        this.doctors = data;
    });
}

  sendReport(form: NgForm){
    if(form.value.doctorId !== null && form.value.doctorId !== undefined && form.value.doctorId != ''){
      this.reportService.sendReport(form.value.doctorId, this.report).subscribe((data) => {
        let d = new Date();
          let message = <Message>{
            sender_id: this.admin.id.toString(),
            receiver_id: form.value.doctorId.toString(),
            date: null,
            content: "Administrator " + this.admin.fname + " " + this.admin.lname + " has sent a report. Name: " + this.report.name,
            time: null,
            messageType: MessageType.EMAIL,
            subject: "NEW REPORT(ADMIN)",
            viewed: null
        }
        this.messageService.saveMessage(message).forEach(m => m)
        if(form.value.patientId !== null && form.value.patientId !== undefined && form.value.patientId != ''){
          this.reportService.sendReport(form.value.patientId, this.report).subscribe();
          let d = new Date();
          let message = <Message>{
            sender_id: this.admin.id.toString(),
            receiver_id: form.value.patientId.toString(),
            date: null,
            content: "Administrator " + this.admin.fname + " " + this.admin.lname + " has sent a report. Name: " + this.report.name,
            time: null,
            messageType: MessageType.EMAIL,
            subject: "NEW REPORT(ADMIN)",
            viewed: null
        }
        this.messageService.saveMessage(message).forEach(m => m)
        }
        form.reset();
        alert("Report sent!");
      });
    }
    if(form.value.patientId !== null && form.value.patientId !== undefined && form.value.patientId != ''){
      this.reportService.sendReport(form.value.patientId, this.report).subscribe((data)=>{
        let d = new Date();
          let message = <Message>{
            sender_id: this.admin.id.toString(),
            receiver_id: form.value.patientId.toString(),
            date: null,
            content: "Administrator " + this.admin.fname + " " + this.admin.lname + " has sent a report. Name: " + this.report.name,
            time: null,
            messageType: MessageType.EMAIL,
            subject: "NEW REPORT(ADMIN)",
            viewed: null
        }
        this.messageService.saveMessage(message).forEach(m => m) 
        form.reset();
        alert("Report sent!");
      });
     
    }
  }

  deleteReport(report: Report){
    this.reportService.deleteReport(report.id, this.admin.id).subscribe((data)=>{
      this.reports = [];
      window.location.reload();
    })
  }

  setReport(report: Report){
    this.report = report;
  }

  uploadReport(form: NgForm): void {
    if (this.selectedFiles) {
      const file: File = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.reportService.saveReport(this.currentFile, this.admin.id).subscribe((data: any) => {
            this.report = data;
            form.reset();
            alert("File uploaded!");
            window.location.reload();
          });
      }
      this.selectedFiles = undefined;
    }
  }

}
