import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String  = environment.backendURI;
  
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private http: HttpClient) { }

  //most of these are self explanatory

  getUserByGannonId(gannon_id: String) {
    return this.http.get(`${this.uri}/user/gannonID/${gannon_id}`);
  }

  getUserByGmailId(gmail: String) {
    return this.http.get(`${this.uri}/user/gmail/${gmail}`);
  }
 
  checkIfUserExists(gmail: String) {
    return this.http.get(`${this.uri}/user/exists/${gmail}`)
  }

  //uses gannon id instead of gmail above to find if a user exists
  checkIfUserExistsGannonID(gannon_id: String) {
    return this.http.get(`${this.uri}/user/existsGannonID/${gannon_id}`)
  }

  checkIfUserAuthenticated(gmail: String) {
    return this.http.get(`${this.uri}/user/authenticated/${gmail}`)
  }

  addUser(gmail: String) {
    const newUser = {
      gmail: gmail,
      userType: "not set",
      gannon_id: "not added",
      idNumber: 0
    }
    return this.http.post(`${this.uri}/user`, newUser, this.httpOptions);
  }

  updateUserByGmail(gannon_id: String, gmail: String, userType: String, authenticated: boolean, idNumber: Number, notifications: boolean){
    const updatedUser = {
      gmail: gmail,
      userType: userType,
      gannon_id: gannon_id,
      idNumber: idNumber,
      authenticated: authenticated,
      notifications: notifications
    }
    return this.http.patch(`${this.uri}/user/gmail/${gmail}`, updatedUser, this.httpOptions);
  }

  //sends request to backend to send authentication code to users gannon email
  sendCode(gannon_id: String, gmail: String, userType: String, authenticated: boolean, idNumber: Number, notifications: boolean){
    const user = {
      gmail: gmail,
      userType: userType,
      gannon_id: gannon_id,
      idNumber: idNumber,
      authenticated: authenticated, 
      notifications: notifications
    }
    return this.http.post(`${this.uri}/user/generateCode`, user, this.httpOptions);
  }

  changeNotificationPreference(gannon_id: String, gmail: String, userType: String, authenticated: boolean, idNumber: Number, notifications: boolean){
    const updatedUser = {
      gmail: gmail,
      userType: userType,
      gannon_id: gannon_id,
      idNumber: idNumber,
      authenticated: authenticated,
      notifications: notifications
    }
    return this.http.post(`${this.uri}/user/notification`, updatedUser, this.httpOptions);
  }

  deleteUserByGannonID(gmail: String){
    return this.http.delete(`${this.uri}/user/gmail/${gmail}`);
  }

  checkIfUserSignedUp(idNumber: string){
    return this.http.get(`${this.uri}/user/signedUp/${idNumber}`);
  }
}
