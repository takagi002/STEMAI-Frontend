import { Component, OnInit, Inject, NgZone } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharingService } from '../services/sharing-service/sharing.service';

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

  
  constructor(private router: Router, private userService: UserService, public dialogRef: MatDialog, private zone: NgZone, private errorSnackBar: MatSnackBar, private sharingService: SharingService) { }

//gets user from previous page
  ngOnInit(): void {
    this.currentUser = this.sharingService.getCurrentUser();

    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }
    
  }

  //simple routing method
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  //opens the verification popup
  openDialog(){
    this.zone.run(() => {
      this.dialogRef.open(VerificationPopupComponent);
    })
    
  }

  //opens an error snackbar to say gannon id already in use
  openSnackBar() {
    this.errorSnackBar.open("Gannon ID already in use", "Close",{
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  //adds a professor user in db and opens dialof
  async addProfessorUser(){
      this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "professor", false, this.idNumber).subscribe(res => {})
      this.userService.sendCode(this.gannonID, this.currentUser, "professor", false, this.idNumber).subscribe(res => {})
      this.sharingService.setUserType("professor");
      this.openDialog();
}

  //adds a student user in db and opens dialof
  async addStudentUser(){
      this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "student", false, this.idNumber).subscribe(res => {})
      this.userService.sendCode(this.gannonID, this.currentUser, "student", false, this.idNumber).subscribe(res => {})
      this.sharingService.setUserType("student");
      this.openDialog();
  }

  //checks backend to see if a gannon id is already in use
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

