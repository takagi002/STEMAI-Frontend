import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing-service/sharing.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

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
