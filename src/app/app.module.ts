import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ScheduleModule, RecurrenceEditorAllModule, DayService, WeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/home/home.component';
import { NewComponent } from './new/new.component';
import { PatientpComponent } from './patientp/patientp.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DoctorpComponent } from './doctorp/doctorp.component';
import { ForgotComponent } from './forgot/forgot.component';
import { TermComponent } from './term/term.component';
import { PatientComponent } from './patient/patient.component';
import { AddressComponent } from './address/address.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicalHistoryComponent } from './medicalHistory/medicalHistory.component';
import { SappComponent } from './sapp/sapp.component';
import { MessageComponent } from './message/message.component';
import { UserComponent } from './user/user.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ShowapptComponent } from './showappt/showappt.component';
import { PatientlistComponent } from './patientlist/patientlist.component';
import { MedreqComponent } from './medreq/medreq.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { LoginComponent } from './login/login.component';
import { PchatComponent } from './pchat/pchat.component';
import { PrecordsComponent } from './precords/precords.component';
import { VchatComponent } from './vchat/vchat.component';
import { UploadrepComponent } from './uploadrep/uploadrep.component';
import { DocchatsComponent } from './docchats/docchats.component';
import { DocinboxComponent } from './docinbox/docinbox.component';
import { AdminpComponent } from './adminp/adminp.component';
import { AdminappComponent } from './adminapp/adminapp.component';
import { SettingsPComponent } from './settingsP/settingsP.component';
import { RequestComponent } from './requests/request.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AdminAddUserComponent } from 'src/app/adminadduser/adminadduser.component';
import { UploadRepAdmin } from './uploadRepAdmin/uploadRepAdmin.component';
import { SettingsAComponent } from './settingsA/settingsA.component';
import { SettingsDComponent } from './settingsD/settingsD.component';
import { aBoxComponent } from './adminbox/adminbox.component';
import { dBoxComponent } from './doctorbox/doctorbox.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ResourceComponent } from './resources/resources.component';
import {AuthInterceptor} from "./auth.interceptor";
import { pBoxComponent } from './patientinbox/pbox.component';
import { SearchResultsComponent } from './search/searchResults.component';
import { SearchComponent } from './search/search.component';
import { CovidComponent } from './covid/covid.component';
import { ContactUsComponent } from './contactUs/contactUs.component';

const Routs: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'new', component:NewComponent},
  {path: 'patientp', component:PatientpComponent},
  {path: 'doctorp', component:DoctorpComponent},
  {path: 'about', component:AboutComponent},
  {path: 'privacy', component:PrivacyComponent},
  {path: 'forgot', component:ForgotComponent},
  {path: 'term', component:TermComponent},
  {path: 'patient', component:PatientComponent},
  {path: 'address', component:AddressComponent},
  {path: 'insurance', component:InsuranceComponent},
  {path: 'prescription', component:PrescriptionComponent},
  {path: 'medical_history', component:MedicalHistoryComponent},
  {path:'sapp', component:SappComponent},
  {path: 'message', component:MessageComponent},
  {path: 'user', component:UserComponent},
  {path: 'doctor', component:DoctorComponent},
  {path: 'showappt', component:ShowapptComponent},
  {path: 'patientlist', component:PatientlistComponent},
  {path: 'medreq', component:MedreqComponent},
  {path: 'appointment', component:AppointmentComponent},
  {path: 'login', component:LoginComponent},
  {path: 'pchat', component:PchatComponent},
  {path: 'precords', component:PrecordsComponent},
  {path: 'vchat', component:VchatComponent},
  {path: 'uploadrep', component:UploadrepComponent},
  {path: 'docchats', component:DocchatsComponent},
  {path: 'docinbox', component:DocinboxComponent},
  {path: 'settingsP', component:SettingsPComponent},
  {path: 'adminp', component:AdminpComponent},
  {path: 'requests', component:RequestComponent},
  {path: 'adminapp', component:AdminappComponent},
  {path: 'adminadduser', component:AdminAddUserComponent},
  {path: 'uploadRepAdmin', component:UploadRepAdmin},
  {path: 'settingsA', component:SettingsAComponent},
  {path: 'settingsD', component:SettingsDComponent},
  {path: 'aBox', component:aBoxComponent},
  {path: 'dBox', component:dBoxComponent},
  {path: 'resources', component:ResourceComponent},
  {path: 'pBox', component:pBoxComponent},
  {path: 'search', component:SearchResultsComponent},
  {path: 'covid', component:CovidComponent},
  {path: 'contactUs', component:ContactUsComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
];

export const interceptorProviders=
  [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    PatientpComponent,
    DoctorpComponent,
    AboutComponent,
    PrivacyComponent,
    ForgotComponent,
    TermComponent,
    PatientComponent,
    AddressComponent,
    InsuranceComponent,
    PrescriptionComponent,
    MedicalHistoryComponent,
    SappComponent,
    MessageComponent,
    UserComponent,
    DoctorComponent,
    ShowapptComponent,
    PatientlistComponent,
    MedreqComponent,
    AppointmentComponent,
    LoginComponent,
    PchatComponent,
    PrecordsComponent,
    VchatComponent,
    UploadrepComponent,
    DocchatsComponent,
    DocinboxComponent,
    AdminpComponent,
    AdminappComponent,
    RequestComponent,
    AdminAddUserComponent,
    SettingsPComponent,
    UploadRepAdmin,
    SettingsAComponent,
    SettingsDComponent,
    aBoxComponent,
    dBoxComponent,
    ResourceComponent,
    pBoxComponent,
    SearchResultsComponent,
    CovidComponent,
    ContactUsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routs),
    CalendarModule.forRoot({
     provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NoopAnimationsModule,
  ],
  providers: [DayService, WeekService, MonthService , interceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
