import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.css']
})
export class VerificationPopupComponent implements OnInit {
  code: any;
  currentUser: any;
  userWithCode: any;

  

  
  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<VerificationPopupComponent>, private errorSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    
    this.currentUser = this.userService.currentUser;
    this.userService.currentUser = undefined;

    this.getCodeFromUser();

  }

  goToPage(pageName:string){
    this.userService.currentUser = this.currentUser;
    this.router.navigate([`${pageName}`]);
  }

  openSnackBar() {
    this.errorSnackBar.open("Incorrect Authentication Code", "Close",{
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  async getCodeFromUser(){
    await this.userService.getUserByGmailId(this.currentUser).subscribe(res => {
      this.userWithCode = res;
    })
  }

  checkCode(){
    if(this.userWithCode.authenticationCode == this.code){
      this.authenticateUser();
      this.userService.currentUser = this.currentUser;
      this.goToPage("student-rec")
      this.dialogRef.close();
    } else {
      this.openSnackBar();
    }
  }
  
  async authenticateUser(){
  
    await this.userService.updateUserByGannonID(this.userWithCode.gannon_id ,this.userWithCode.gmail, this.userWithCode.userType, true, this.userWithCode.idNumber).subscribe(res =>{
    })
  }

  
}
