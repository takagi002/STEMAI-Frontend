import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  currentUser: string = "currentUser";
  userType: string = "userType";
  gannon_id: string = "gannon_id";
  idNumber: string = "idNumber";
  authenticated: string = "authenticated";
  authenticationCode : string = "authenticationCode";
  notifications: string = "notifications";
  currentClass: string = "currentClass";
  currentSemester: string = "currentSemester";
  currentClassName: string = "currentClassName";
  currentName: string = "currentName"


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

  setGannonID(data: any){
    localStorage.setItem(this.gannon_id, JSON.stringify(data));
  }

  getGannonID() {
    let data = localStorage.getItem(this.gannon_id);
    return JSON.parse(data || '{}');
  }

  clearGannonID() {
    localStorage.removeItem(this.gannon_id);
  }

  setIDNumber(data: any){
    localStorage.setItem(this.idNumber, JSON.stringify(data));
  }

  getIDNumber() {
    let data = localStorage.getItem(this.idNumber);
    return JSON.parse(data || '{}');
  }

  clearIDNumber() {
    localStorage.removeItem(this.idNumber);
  }

  setAuthenticationCode(data: any){
    localStorage.setItem(this.authenticationCode, JSON.stringify(data));
  }

  getAuthenticationCode() {
    let data = localStorage.getItem(this.authenticationCode);
    return JSON.parse(data || '{}');
  }

  clearAuthenticationCode() {
    localStorage.removeItem(this.authenticationCode);
  }

  setAuthenticated(data: any){
    localStorage.setItem(this.authenticated, JSON.stringify(data));
  }

  getAuthenticated() {
    let data = localStorage.getItem(this.authenticated);
    return JSON.parse(data || '{}');
  }

  clearAuthenticated() {
    localStorage.removeItem(this.authenticated);
  }

  setNotifications(data: any){
    localStorage.setItem(this.notifications, JSON.stringify(data));
  }

  getNotifications() {
    let data = localStorage.getItem(this.notifications);
    return JSON.parse(data || '{}');
  }

  clearNotifications() {
    localStorage.removeItem(this.notifications);
  }

  setCurrentClass(data: any){
    localStorage.setItem(this.currentClass, JSON.stringify(data));
  }

  getCurrentClass() {
    let data = localStorage.getItem(this.currentClass);
    return JSON.parse(data || '{}');
  }

  clearCurrentClass() {
    localStorage.removeItem(this.currentClass);
  }

  setCurrentSemester(data: any){
    localStorage.setItem(this.currentSemester, JSON.stringify(data));
  }

  getCurrentSemester() {
    let data = localStorage.getItem(this.currentSemester);
    return JSON.parse(data || '{}');
  }

  clearCurrentSemester() {
    localStorage.removeItem(this.currentSemester);
  }

  setCurrentClassName(data: any){
    localStorage.setItem(this.currentClassName, JSON.stringify(data));
  }

  getCurrentClassName() {
    let data = localStorage.getItem(this.currentClassName);
    return JSON.parse(data || '{}');
  }

  clearCurrentClassName() {
    localStorage.removeItem(this.currentClassName);
  }

  setCurrentName(data: any){
    localStorage.setItem(this.currentName, JSON.stringify(data));
  }

  getCurrentName() {
    let data = localStorage.getItem(this.currentName);
    return JSON.parse(data || '{}');
  }

  clearCurrentName() {
    localStorage.removeItem(this.currentName);
  }
}

