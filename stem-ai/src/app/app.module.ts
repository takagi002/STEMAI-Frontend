import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { StudentRecComponent } from './student-rec/student-rec.component';


const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'student-rec', component: StudentRecComponent },
  { path: '', redirectTo: '/student-rec', pathMatch: 'full' },
];

imports: [
  RouterModule,
  BrowserModule,
  BrowserAnimationsModule,
]

@NgModule({
  imports:      [MatIconModule, MatButtonModule, MatToolbarModule, MatSlideToggleModule, MatCheckboxModule, MatCardModule, FlexLayoutModule, BrowserModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, LoginComponent, InfoComponent, StudentRecComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { 
  
}
