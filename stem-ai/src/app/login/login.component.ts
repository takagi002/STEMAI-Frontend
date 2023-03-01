import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { environment } from 'src/environment';
import {Router} from '@angular/router';
import { UserService } from '../services/user-services/user.service';


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
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(private router: Router, private userService: UserService) { }
  goToPage(pageName:string){
    this.userService.currentUser = this.currentUser;
    console.log("Login: " + this.userService.currentUser);
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit() {

    this.googleAuthSDK();
  }

   callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        this.currentUser = profile.getEmail();
        this.checkUserExists(profile.getEmail());

        this.goToPage('info')

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: environment.clientid,
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }


  async addNewUser(gmail: String) {
    this.userService.addUser(gmail).subscribe(res => {
      this.user = res;
      console.log(this.user);
    }) 
  }

  async checkUserExists(gmail: String) {
    var exists: any;
    await this.userService.checkIfUserExists(gmail).subscribe(res => {
      exists = res;
      if(!exists){
        this.addNewUser(gmail);
      } 
     
    })
    
  }
}