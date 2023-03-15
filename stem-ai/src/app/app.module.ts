import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';
import { StudentRecComponent } from './student-rec/student-rec.component';
import { SettingComponent } from './setting/setting.component';
import { ClassService } from './services/class-service/class.service';
import { VerificationPopupComponent } from './verification-popup/verification-popup.component';
import { OnlynumberDirective } from './onlynumber.directive';
import { WconlinePopupComponent } from './wconline-popup/wconline-popup.component';
import { ProfessorClassesComponent } from './professor-classes/professor-classes.component';
import { PredictionServiceService } from './services/prediction-service/prediction-service.service';
import { UserService } from './services/user-services/user.service';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'student-rec', component: StudentRecComponent },
  { path: '', redirectTo: '/student-rec', pathMatch: 'full' },
  { path: 'setting', component: SettingComponent },
  { path: '', redirectTo: '/setting', pathMatch: 'full' },
  { path: 'professor-classes', component: ProfessorClassesComponent },
  { path: '', redirectTo: '/professor-classes', pathMatch: 'full' },
  { path: 'contact-page', component: ContactPageComponent },
  { path: '', redirectTo: '/contact-page', pathMatch: 'full' },
  { path: 'about-page', component: AboutPageComponent },
  { path: '', redirectTo: '/about-page', pathMatch: 'full' }
];

imports: [
  RouterModule,
  BrowserModule,
  BrowserAnimationsModule,
]

@NgModule({
  imports:      [ HttpClientModule, MatListModule, MatTooltipModule, MatGridListModule, MatDividerModule, 
                  MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSlideToggleModule, 
                  MatCheckboxModule, MatCardModule, FlexLayoutModule, BrowserModule, RouterModule.forRoot(routes), 
                  FormsModule, MatDialogModule, MatSnackBarModule, BrowserAnimationsModule],
  declarations: [ AppComponent, LoginComponent, InfoComponent, StudentRecComponent, SettingComponent, VerificationPopupComponent, OnlynumberDirective, WconlinePopupComponent, ProfessorClassesComponent, ContactPageComponent, AboutPageComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ ClassService, PredictionServiceService, UserService ]
})

export class AppModule { 
  
}
