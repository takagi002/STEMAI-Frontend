import { Component, OnInit, Inject, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';

export interface DialogData {
  code: any;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})



export class InfoComponent implements OnInit {

  currentUser: any;
  code: any;
  gannonID: any;

  
  constructor(private router: Router, private userService: UserService, public dialogRef: MatDialog, private zone: NgZone) { }


  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.currentUser = undefined;
  }
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  openDialog(){
    this.userService.currentUser = this.currentUser;
    this.zone.run(() => {
      this.dialogRef.open(VerificationPopupComponent);
    })
    
  }

  async addProfessorUser(){
    this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "professor", false).subscribe(res => {})
    this.userService.sendCode(this.gannonID, this.currentUser, "professor", false).subscribe(res => {})
    this.openDialog();
}

  async addStudentUser(){
    this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "student", false).subscribe(res => {})
    this.userService.sendCode(this.gannonID, this.currentUser, "student", false).subscribe(res => {})
    this.openDialog();
  }

}

