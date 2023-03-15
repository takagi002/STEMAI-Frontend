import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SharingService } from '../services/sharing-service/sharing.service';


@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.css']
})
export class VerificationPopupComponent implements OnInit {
  code: any;
  currentUser: any;
  userWithCode: any;
  userType: any;

  

  
  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<VerificationPopupComponent>, private errorSnackBar: MatSnackBar, private sharingService:SharingService) {}

  ngOnInit(): void {
    
    //getting user from previous page
    this.currentUser = this.sharingService.getCurrentUser();
    this.userType = this.sharingService.getUserType();
    
    this.getCodeFromUser();

  }

  //just a routing method
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  //opens up a snackbar to show an incorrect code was entered
  openSnackBar() {
    this.errorSnackBar.open("Incorrect Authentication Code", "Close",{
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  //gets code stored in user object in db
  async getCodeFromUser(){
    await this.userService.getUserByGmailId(this.currentUser).subscribe(res => {
      this.userWithCode = res;
    })
  }

  //checks that the code the user entered matches the one stored in the db that was generated
  checkCode(){
    if(this.userWithCode.authenticationCode == this.code){
      this.authenticateUser();
      if(this.userType == "student"){
        this.goToPage("student-rec")
      } else if(this.userType == "professor"){
        this.goToPage("professor-classes")
      }
      
      this.dialogRef.close();
    } else {
      this.openSnackBar();
    }
  }
  
  //method to set authentication to true for the user in the backend
  async authenticateUser(){
  
    await this.userService.updateUserByGannonID(this.userWithCode.gannon_id ,this.userWithCode.gmail, this.userWithCode.userType, true, this.userWithCode.idNumber).subscribe(res =>{
    })
  }

  
}
