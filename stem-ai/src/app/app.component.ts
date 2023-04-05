import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { SharingService } from './services/sharing-service/sharing.service';
import { UserService } from './services/user-services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'stem-ai';
  userID: any;
  userType: any;
  user: any; 

  constructor(public router: Router, private sharingService: SharingService) { }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(){
    this.userID = this.sharingService.getIDNumber();
    this.userType = this.sharingService.getUserType();
  }
}