import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClassService } from '../services/class-service/class.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { WconlinePopupComponent } from '../wconline-popup/wconline-popup.component';

export interface DialogData {
  code: any;
}

@Component({
  selector: 'app-student-rec',
  templateUrl: './student-rec.component.html',
  styleUrls: ['./student-rec.component.css']
})
export class StudentRecComponent implements OnInit{
  constructor(private classService: ClassService, public dialogRef: MatDialog,private zone: NgZone) {}

  classes: any = [];

  ngOnInit() {
    this.classService.getClasses().subscribe(res => {
      this.classes = res;
      console.log(this.classes);
    })  
  }
  openDialog(){
    this.zone.run(() => {
      this.dialogRef.open(WconlinePopupComponent);
    })
    
  }
}
