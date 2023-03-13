import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wconline-popup',
  templateUrl: './wconline-popup.component.html',
  styleUrls: ['./wconline-popup.component.css']
})
export class WconlinePopupComponent {

  constructor(
    public dialogRef: MatDialogRef<WconlinePopupComponent>){}
    
  onNoClick(): void {
    this.dialogRef.close();
  }

}
