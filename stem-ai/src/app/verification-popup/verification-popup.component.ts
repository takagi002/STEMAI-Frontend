import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-services/user.service';


@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.css']
})
export class VerificationPopupComponent implements OnInit {
  code: any;
  currentUser: any;
  userWithCode: any;


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
    this.currentUser = this.userService.currentUser;
    this.userService.currentUser = undefined;

    this.getCodeFromUser();

  }

  async getCodeFromUser(){
    await this.userService.getUserByGmailId(this.currentUser).subscribe(res => {
      this.userWithCode = res;
    })
  }

  checkCode(){
    if(this.userWithCode.authenticationCode == this.code){
      this.authenticateUser();
    } else {
      console.log("Dumbass");
    }
  }
  
  async authenticateUser(){
  
    await this.userService.updateUserByGannonID(this.userWithCode.gannon_id ,this.userWithCode.gmail, this.userWithCode.userType, true).subscribe(res =>{
      console.log("We the best music!!!")
    })
  }
}
