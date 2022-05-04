import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientpComponent} from "./patientp/patientp.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {SettingsPComponent} from "./settingsP/settingsP.component";
import {pBoxComponent} from "./patientinbox/pbox.component";
import {DoctorpComponent} from "./doctorp/doctorp.component";

import {SettingsDComponent} from "./settingsD/settingsD.component";
import {DocinboxComponent} from "./docinbox/docinbox.component";
import {AdminpComponent} from "./adminp/adminp.component";

import {SettingsAComponent} from "./settingsA/settingsA.component";
import {PatientGuardGuard} from "./patient-guard.guard";
import {DoctorGuardGuard} from "./doctor-guard.guard";
import {AdminGuardGuard} from "./admin-guard.guard";


const routes: Routes = [
  {path: 'patientp', component: PatientpComponent, canActivate:[PatientGuardGuard]},
  {path: 'settingsP', component: SettingsPComponent, canActivate:[PatientGuardGuard]},
  {path: 'patientinbox', component: pBoxComponent, canActivate:[PatientGuardGuard]},
  {path: 'doctorp', component: DoctorpComponent, canActivate:[DoctorGuardGuard]},
  {path: 'settingsD', component: SettingsDComponent, canActivate:[DoctorGuardGuard]},
  {path: 'doctorbox', component: DocinboxComponent, canActivate:[DoctorGuardGuard]},
  {path: 'adminp', component: AdminpComponent, canActivate:[AdminGuardGuard]},
  {path: 'settingsA', component: SettingsAComponent, canActivate:[AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
