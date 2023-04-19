import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { environment } from 'src/environment';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from '../services/authentication/auth.service';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';
import { SharingService } from '../services/sharing-service/sharing.service';
import { StudentService } from '../services/student-service/student.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  user: any;
  title = 'stem-ai';
  auth2: any;
  currentUser: any;
  student: any;

  private clientId = environment.clientid

  constructor(private router: Router, private userService: UserService, private sharingService: SharingService, private studentService: StudentService, private _ngZone: NgZone, private authenticationService: AuthService,) { }
  goToPage(pageName:string){
    this.sharingService.setCurrentUser(this.currentUser);
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" } 
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
    
    this.sharingService.setCurrentSemester("S2023");
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authenticationService.LoginWithGoogle(response.credential).subscribe(
      (x:any) => {
        this._ngZone.run(() => {
          this.router.navigate(['/logout']);
        })},
      (error:any) => {
          console.log(error);
        }
      );  
}

  //adds a new user
  async addNewUser(gmail: String) {
    this.userService.addUser(gmail).subscribe(res => {
      this.user = res;
    })
  }

  //checks db to see if user already exists then if they don't adds a new user and if they do checks if the user is authenticated
  async checkUserExists(gmail: String) {
    var exists: any;
    await this.userService.checkIfUserExists(gmail).subscribe(res => {
      exists = res;
      console.log(exists)
      if(!exists){
        console.log("opp")
        this.addNewUser(gmail);
        this.goToPage('info');
      } else {
        this.checkIfAuthenticated(gmail);
      }

    })

  }

  //checks db to see if user authenticated, if they are go to student rec page if not go to info page
  async checkIfAuthenticated(gmail: String){
    var authenticated: any;
    var user: any;
    await this.userService.checkIfUserAuthenticated(gmail).subscribe(res => {
      authenticated = res;
      if(authenticated){
         this.userService.getUserByGmailId(gmail).subscribe(res =>{
          user = res;
          this.sharingService.setGannonID(user.gannon_id);
          this.sharingService.setIDNumber(user.idNumber);
          if(user.userType === "student"){
            this.studentService.getStudent(user.idNumber).subscribe(res => {
                res = this.student;
                this.sharingService.setCurrentName(this.student.name);
            })
            this.goToPage('student-rec');
          } else if(user.userType === "professor"){
            this.sharingService.setGannonID(user.gannon_id);
            this.goToPage('professor-classes');
          }
        })

      } else {
        this.goToPage('unauthenticated-user');
      }
    })
  }
}
