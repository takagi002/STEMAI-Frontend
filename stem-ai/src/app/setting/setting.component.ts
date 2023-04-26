import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteUserPopupComponent } from '../delete-user-popup/delete-user-popup.component';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

  currentUser: any;
  fullUser: any;
  checked: any;
  name: any; 
  userID: any;
  gannonID: any;

  constructor(private sharingService: SharingService, private router: Router, private userService: UserService, public dialogRef: MatDialog, private zone: NgZone,) {}

  ngOnInit(){
    this.name = this.sharingService.getCurrentName();
    this.userID = this.sharingService.getIDNumber();
    this.gannonID = this.sharingService.getGannonID();
    this.currentUser = this.sharingService.getCurrentUser();
    this.userService.getUserByGmailId(this.currentUser).subscribe(res =>{
      this.fullUser = res;
      this.checked = this.fullUser.notifications;
    })
    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }
    

  }
  
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }

  async setNotificationPreference(event: any){
    console.log(event.checked);
    await this.userService.changeNotificationPreference(this.fullUser.gannon_id, this.fullUser.gmail, this.fullUser.userType, this.fullUser.authenticated, this.fullUser.idNumber, event.checked).subscribe(res => {
      
    })
  }

  openDialog(){
    this.zone.run(() => {
      this.dialogRef.open(DeleteUserPopupComponent);
    })
  }
}
