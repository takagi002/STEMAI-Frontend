import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorClassesService } from '../services/professor-class-service/professor-classes.service';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';

@Component({
  selector: 'app-professor-classes',
  templateUrl: './professor-classes.component.html',
  styleUrls: ['./professor-classes.component.css']
})
export class ProfessorClassesComponent {

  currentUser: any;
  userID: any;
  classes: any;
  currentSemester: any;

  constructor(private sharingService: SharingService, private router: Router, private professorClassesService: ProfessorClassesService) {}

  ngOnInit(){
    this.currentUser = this.sharingService.getCurrentUser();
    this.userID = this.sharingService.getIDNumber();
    this.currentSemester = this.sharingService.getCurrentSemester();

    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }

    this.professorClassesService.getProfessorClasses(this.userID, this.currentSemester).subscribe(res =>{
      this.classes = res;
    })

  }

  
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }

  goToStudentPage(classID: any, className: string){
    this.sharingService.setCurrentClass(classID);
    this.sharingService.setCurrentClassName(className);
    this.goToPage("professor-students");
  }

}
