import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailService } from '../services/email-service/email.service';
import { ProfessorClassesService } from '../services/professor-class-service/professor-classes.service';
import { SharingService } from '../services/sharing-service/sharing.service';
import { UserService } from '../services/user-services/user.service';
import { PredictionServiceService } from '../services/prediction-service/prediction-service.service';

@Component({
  selector: 'app-professor-students',
  templateUrl: './professor-students.component.html',
  styleUrls: ['./professor-students.component.css']
})
export class ProfessorStudentsComponent {

  currentUser: any;
  userID: any;
  students: any;
  currentClass: any;
  currentSemester: any;
  currentGannonId: any;
  currentClassName: any;

  constructor(private sharingService: SharingService, private router: Router, private professorClassesService: ProfessorClassesService, private userService: UserService, private emailService: EmailService, private errorSnackBar: MatSnackBar, private predictionService: PredictionServiceService) {}

  ngOnInit(){

    this.currentUser = this.sharingService.getCurrentUser();
    this.userID = this.sharingService.getIDNumber();
    this.currentClass = this.sharingService.getCurrentClass();
    this.currentSemester = this.sharingService.getCurrentSemester();
    this.currentGannonId = this.sharingService.getGannonID();
    this.currentClassName = this.sharingService.getCurrentClassName();
    

    if(Object.keys(this.currentUser).length === 0){
      this.goToPage("login")
    }

    this.professorClassesService.getStudentsInClass(this.currentClass,this.currentSemester).subscribe(res =>{
      this.students = res;

      this.students.forEach((studie: {
        needs_tutoring: any;
        isSignedUp: boolean; student_id: string; 
      }) => {
        this.userService.checkIfUserSignedUp(studie.student_id).subscribe(res => {
          var info = res;
          if(!info){
            studie.isSignedUp = false;
          } else {
            studie.isSignedUp = true;
          }
        });
        this.predictionService.getStudentPredictionsByStudentIDandClass(studie.student_id, this.currentSemester, this.currentClass).subscribe(res => {
          studie.needs_tutoring = res
        })
        
        
      });
    })
  }

  
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }

  //opens up a snackbar that email sent
  openSnackBar() {
      this.errorSnackBar.open("Email(s) Sent", "Close",{
        horizontalPosition: "center",
        verticalPosition: "top",
      }) 
  }


  //checks if selected users have signed up and if so sends an email to them
  //this is the worst code i've ever written but i'm so tired of this project
  //it somehow works so I'm leaving it
  //if you find this i'm sorry but I feel like no one will ever use this anyway
  //actually crying at this mess please help me

  async sendToSelected(){
    var selectedStudents = this.students.filter((a: { isSelected: any; })=>a.isSelected);
    var info: any;
    await selectedStudents.forEach((student: { student_id: string; }) => {
      this.userService.checkIfUserSignedUp(student.student_id).subscribe(res => {
         info = res;
         console.log(info);
      if(!info){
        console.log('uh-oh spaghetti broke');
      } else{
        var email = info.gannon_id + '@gannon.edu';
        //why does this make it work but if i just put them in the sendRecEmail it doesn't
        var cname = this.currentClassName;
        var profName = this.currentGannonId;
        this.emailService.sendRecEmail(email, cname, profName).subscribe(res => {
          this.openSnackBar();
        });
      }
      });
    });
  }

  //also really bad but i'm being lazy since i'm done with this project at this point
  //i just want to graduate man
  async sendToAll(){
    var info: any;
    await this.students.forEach((stude: { student_id: string; }) => {
      this.userService.checkIfUserSignedUp(stude.student_id).subscribe(res => {
        info = res;
        console.log(info);
     if(!info){
       console.log('uh-oh spaghetti broke');
     } else{
       var email = info.gannon_id + '@gannon.edu';
       //why does this make it work but if i just put them in the sendRecEmail it doesn't
       var cname = this.currentClassName;
       var profName = this.currentGannonId;
       this.emailService.sendRecEmail(email, cname, profName).subscribe(res => {
         this.openSnackBar();
       });
     }
     });
    })
  }


  getPredictionsForStudents() {

  }

}


