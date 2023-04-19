import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { SharingService } from './services/sharing-service/sharing.service';
import { environment } from 'src/environment';
import {NgZone, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'stem-ai';
  userID: any;
  userType: any;
  name: any;
  authenticated: any;
  auth2: any;

  constructor(public router: Router, private sharingService: SharingService, private service: AuthService,
    private _ngZone: NgZone) { }
    client: any = null
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(){
    this.userID = this.sharingService.getIDNumber();
    this.userType = this.sharingService.getUserType();
    this.authenticated = this.sharingService.getAuthenticated();
    this.name = this.sharingService.getCurrentName();
  }

  public logout1(){
    this._ngZone.run(() => {
      this.service.revokeToken().subscribe({
        next: (x:any) => {
          this.router.navigate(['/']).then(() => window.location.reload());
        }
      })
    })
    console.log("logged out");
    this.goToPage("home");
  }
}