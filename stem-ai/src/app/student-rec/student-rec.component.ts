import { Component, NgZone } from '@angular/core';
import { OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { WconlinePopupComponent } from '../wconline-popup/wconline-popup.component';
import { UserService } from '../services/user-services/user.service';
import { PredictionServiceService } from '../services/prediction-service/prediction-service.service';
import { ClassService } from '../services/class-service/class.service';

export interface DialogData {
  code: any;
}

@Component({
  selector: 'app-student-rec',
  templateUrl: './student-rec.component.html',
  styleUrls: ['./student-rec.component.css']
})
export class StudentRecComponent implements OnInit{
  constructor(private userService: UserService, public dialogRef: MatDialog,private zone: NgZone, private predictionService: PredictionServiceService, private classService: ClassService) {}

  predictions: any = [];
  currentUser: any;
  classes: any = [];
  fullUser: any;

  ngOnInit() {

    this.currentUser = this.userService.currentUser;
    console.log("User: " + this.currentUser);

    this.userService.getUserByGmailId(this.currentUser).subscribe(res => {
      this.fullUser = res;
      console.log(this.fullUser)
      this.classService.getClasses().subscribe(res=> {
        this.classes = res;
        this.predictionService.getAllStudentPredictionsByStudentId(this.fullUser.idNumber).subscribe(res => {
          this.predictions = res;
          this.addNamesToPredictions(this.predictions, this.classes);
        })
      })
    })

    this.userService.currentUser = undefined;

    

  
  }
  openDialog(){
    this.zone.run(() => {
      this.dialogRef.open(WconlinePopupComponent);
    })
    
  }

  async getClassNames(){
    await this.classService.getClasses().subscribe(res=> {
      this.classes = res;
    })
  }

  async getPredictions(){
    await this.predictionService.getAllStudentPredictionsByStudentId(this.currentUser.student_id).subscribe(res => {
      this.predictions = res;
    })
  }

  addNamesToPredictions(predictions: any, classes: any){
    var name: any;
    predictions.forEach((pred: { course_id: String, student_id: String, prediction: Boolean, reason: String, name: String}) => {
      name = classes.find((element: { course_id: String }) => element.course_id === pred.course_id);
      pred.name = name.course_name;
    });

    console.log(this.predictions);
  }
  
}
