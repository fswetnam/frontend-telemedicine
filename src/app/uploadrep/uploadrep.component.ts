import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from '../admin/Admin';
import { AdminService } from '../admin/admin.service';
import { Doctor } from '../doctor/Doctor';
import { DoctorService } from '../doctor/doctor.service';
import { Patient } from '../patient/Patient';
import { PatientService } from '../patient/patient.service';
import { Report } from '../report/Report';
import { ReportService } from '../report/report.service';
import { HttpClient} from "@angular/common/http";
import { UserSession } from '../user/UserSession';
import { User } from '../user/User';

@Component({
  selector: 'app-uploadrep',
  templateUrl: './uploadrep.component.html',
  styleUrls: ['./uploadrep.component.css']
})
export class UploadrepComponent implements OnInit {

  doctor: Doctor;
  reports: Report[] = [];
  report!: Report;
  patients!: Patient[];
  admins!: Admin[];

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  constructor(private doctorService: DoctorService, private reportService: ReportService, 
    private patientService: PatientService, private adminService: AdminService,
    private http: HttpClient) { }


  openNav(){
    document.getElementById("mysideBar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
  }

  closeNav(){
    document.getElementById("mysideBar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  

  ngOnInit() {
    this.doctor = UserSession.getUserSession();
    this.getReports();
    this.getPatients();
    this.getAdmins();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  getReports(){
    this.reports = [];
    this.doctorService.getReportIds(this.doctor.id).subscribe((data: number[])=>{
      data.forEach(repId =>{
        this.reportService.getReport(repId).subscribe((report: Report)=>{
          this.reports.push(report);
        })
      })
    })
  }

  downloadReport(id: number){
    this.reportService.getURL(id).subscribe((data: string)=>{
      console.log(data);
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

  public getAdmins(){
    this.adminService.getAdmins().subscribe((data: Admin[]) => {
        this.admins = data;
    });
  }

  sendReport(form: NgForm){
    if(form.value.adminId !== null && form.value.adminId !== undefined && form.value.adminId != ''){
      this.reportService.sendReport(form.value.adminId, this.report).subscribe((data) => {
        if(form.value.patientId !== null && form.value.patientId !== undefined && form.value.patientId != ''){
          this.reportService.sendReport(form.value.patientId, this.report).subscribe();
        }
        form.reset();
      });
    }
    if(form.value.patientId !== null && form.value.patientId !== undefined && form.value.patientId != ''){
      this.reportService.sendReport(form.value.patientId, this.report).subscribe();
      form.reset();
    }
  }

  deleteReport(report: Report){
    this.reportService.deleteReport(report.id, this.doctor.id).subscribe((data)=>{
      this.reports = [];
      window.location.reload();
    })
  }

  setReport(report: Report){
    this.report = report;
  }

  uploadReport(form: NgForm): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.reportService.saveReport(this.currentFile, this.doctor.id).subscribe((data: any) => {
            this.report = data;
            this.sendReport(form);
            form.reset();
            alert("File uploaded!");
            window.location.reload();
          });
      }
      this.selectedFiles = undefined;
    }
  }

}