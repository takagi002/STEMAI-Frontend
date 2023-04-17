import { Component } from '@angular/core';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthenticated-user-page',
  templateUrl: './unauthenticated-user-page.component.html',
  styleUrls: ['./unauthenticated-user-page.component.css']
})
export class UnauthenticatedUserPageComponent {
  authenticationCode: any;
  currentUser: any;
  userWithCode: any;
  userType: any;


  constructor(private userService: UserService, private sharingService:SharingService, private router: Router,  private errorSnackBar: MatSnackBar,) {}

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
  openSnackBar(message: string) {
    this.errorSnackBar.open(message, "Close",{
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
  checkCode(input : any){
    const inputAsNum: number = +input
    const codeAsNum: number = +this.userWithCode.authenticationCode
    if(inputAsNum === codeAsNum){
      this.authenticateUser();
      if(this.userType == "student"){
        this.goToPage("student-rec")
      } else if(this.userType == "professor"){
        this.goToPage("professor-classes")
      }
    } else {
      this.openSnackBar("Incorrect Authentication Code");
    }
  }
  
  //method to set authentication to true for the user in the backend
  async authenticateUser(){
  
    await this.userService.updateUserByGmail(this.userWithCode.gannon_id ,this.userWithCode.gmail, this.userWithCode.userType, true, this.userWithCode.idNumber, true).subscribe(res =>{
    })
  }

  async resendCode(){
    await this.userService.sendCode(this.userWithCode.gannon_id, this.currentUser, this.userType, false, this.userWithCode.idNumber, true).subscribe(res => {})
    this.getCodeFromUser();
    this.openSnackBar("New Code Sent");
  }
}
