import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  currentUser: string = "currentUser";
  userType: string = "userType";

  constructor() { }

  setCurrentUser(data: any){
    localStorage.setItem(this.currentUser, JSON.stringify(data));
  }

  getCurrentUser() {
    let data = localStorage.getItem(this.currentUser);
    return JSON.parse(data || '{}');
  }

  clearCurrentUser() {
    localStorage.removeItem(this.currentUser);
  }

  setUserType(data: any){
    localStorage.setItem(this.userType, JSON.stringify(data));
  }

  getUserType() {
    let data = localStorage.getItem(this.userType);
    return JSON.parse(data || '{}');
  }

  clearUserType() {
    localStorage.removeItem(this.userType);
  }

  cleanAll() {
    localStorage.clear()
  }
}
