import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';

@Component({
  selector: 'app-professor-classes',
  templateUrl: './professor-classes.component.html',
  styleUrls: ['./professor-classes.component.css']
})
export class ProfessorClassesComponent {

  currentUser: any;

  constructor(private sharingService: SharingService, private router: Router) {}

  ngInit(){

    this.currentUser = this.sharingService.getCurrentUser();

    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }

  }

  
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }
}
