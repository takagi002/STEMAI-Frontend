import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})



export class InfoComponent implements OnInit {

  currentUser: any;
  
  constructor(private router: Router, private userService: UserService) { }
  ngOnInit(): void {
    console.log("info: " + this.userService.currentUser)
    this.currentUser = this.userService.currentUser;
    this.userService.currentUser = undefined;
  }
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  gannonID: any;

  async addProfessorUser(){

    this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "professor").subscribe(res => {
      console.log(this.gannonID + " added to user: " + this.currentUser + "as a professor user");
  })
}

  async addStudentUser(){
    this.userService.updateUserByGannonID(this.gannonID, this.currentUser, "student").subscribe(res => {
      console.log(this.gannonID + " added to user: " + this.currentUser + "as a student user");
  })
  }

}
