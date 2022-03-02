import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from 'src/home/home.component';
import { NewComponent } from './new/new.component';
const Routs: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'new', component:NewComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(Routs)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
