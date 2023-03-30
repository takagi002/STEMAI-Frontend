import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorClassesService } from '../services/professor-class-service/professor-classes.service';
import { SharingService } from '../services/sharing-service/sharing.service';

@Component({
  selector: 'app-professor-students',
  templateUrl: './professor-students.component.html',
  styleUrls: ['./professor-students.component.css']
})
export class ProfessorStudentsComponent {

  currentUser: any;
  userID: any;
  students: any;
  currentClass: any;
  currentSemester: any;

  constructor(private sharingService: SharingService, private router: Router, private professorClassesService: ProfessorClassesService) {}

  ngOnInit(){

    this.currentUser = this.sharingService.getCurrentUser();
    this.userID = this.sharingService.getIDNumber();
    this.currentClass = this.sharingService.getCurrentClass();
    this.currentSemester = this.sharingService.getCurrentSemester();

    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }

    this.professorClassesService.getStudentsInClass(this.currentClass,this.currentSemester).subscribe(res =>{
      this.students = res;
    })

  }

  
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }

}
