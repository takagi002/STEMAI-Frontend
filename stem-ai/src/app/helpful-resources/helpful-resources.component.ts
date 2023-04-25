import { Component, NgZone } from '@angular/core';
import { WconlinePopupComponent } from '../wconline-popup/wconline-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-helpful-resources',
  templateUrl: './helpful-resources.component.html',
  styleUrls: ['./helpful-resources.component.css']
})
export class HelpfulResourcesComponent {
  constructor(public dialogRef: MatDialog,private zone: NgZone) {}

  openDialog(){
    this.zone.run(() => {
      this.dialogRef.open(WconlinePopupComponent);
    })

  }
}
