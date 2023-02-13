import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

imports: [
  RouterModule,
  BrowserModule,
  BrowserAnimationsModule,
]

@NgModule({
  imports:      [ MatSlideToggleModule, MatCheckboxModule, MatCardModule,BrowserModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, LoginComponent, InfoComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { 
  
}
