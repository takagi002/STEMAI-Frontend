import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { SharingService } from './services/sharing-service/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'stem-ai';
  userID: any;
  userType: any;
  name: any;
  authenticated: any;

  constructor(public router: Router, private sharingService: SharingService) { }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(){
    this.userID = this.sharingService.getIDNumber();
    this.userType = this.sharingService.getUserType();
    this.authenticated = this.sharingService.getAuthenticated();
    this.name = this.sharingService.getCurrentName();
  }

  logout1(){
    this.sharingService.cleanAll();
    this.goToPage("home-page");
  }
}