import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';


@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.css']
})
export class DeleteUserPopupComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUserPopupComponent>, private userService: UserService, private sharingService: SharingService, private router: Router){}
    
  currentUser: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
    //getting user from previous page
    this.currentUser = this.sharingService.getCurrentUser();
  
  }

  //just a routing method
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


  //deletes user
  async deleteUser() {
      this.userService.deleteUserByGannonID(this.currentUser).subscribe(res => {});
      this.dialogRef.close();
      this.goToPage("login")
  }
}
