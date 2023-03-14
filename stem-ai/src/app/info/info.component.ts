import { Component, OnInit, Inject, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  exists: any
  idNumber: any;

  
  constructor(private router: Router, private userService: UserService, public dialogRef: MatDialog, private zone: NgZone, private errorSnackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.currentUser = undefined;
  }
  goToPage(pageName:string){
    this.userService.currentUser = this.currentUser;
    this.router.navigate([`${pageName}`]);
  }

  openDialog(){
    this.userService.currentUser = this.currentUser;
    this.zone.run(() => {
      this.dialogRef.open(VerificationPopupComponent);
    })
    
  }

  openSnackBar() {
    this.errorSnackBar.open("Gannon ID already in use", "Close",{
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  async addProfessorUser(){
      this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "professor", false, this.idNumber).subscribe(res => {})
      this.userService.sendCode(this.gannonID, this.currentUser, "professor", false, this.idNumber).subscribe(res => {})
      this.openDialog();
}

  async addStudentUser(){
      this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "student", false, this.idNumber).subscribe(res => {})
      this.userService.sendCode(this.gannonID, this.currentUser, "student", false, this.idNumber).subscribe(res => {})
      this.openDialog();
  }

  async checkIfGannonIDExists(type: String){
    var exists: any
    await this.userService.checkIfUserExistsGannonID(this.gannonID).subscribe(res =>{
      exists = res;
      if(!exists){
        if(type === "student"){
          this.addStudentUser()
        } else if(type === "professor"){
          this.addProfessorUser();
        }
      } else {
        this.openSnackBar();
      }
    })
    
    
  }

}

