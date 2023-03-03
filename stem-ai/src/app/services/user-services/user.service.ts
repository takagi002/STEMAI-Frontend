import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String  = environment.backendURI;
  currentUser: any;
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/user`);
  }
  getClassByGannonId(gannon_id: String) {
    return this.http.get(`${this.uri}/user/gannonID/${gannon_id}`);
  }
  getClassByObjectId(id: String) {
    return this.http.get(`${this.uri}/user/objectID/${id}`);
  }

  checkIfUserExists(gmail: String) {
    return this.http.get(`${this.uri}/user/exists/${gmail}`)
  }

  addUser(gmail: String) {
    const newUser = {
      gmail: gmail,
      userType: "not set",
      gannon_id: "not added"
    }
    return this.http.post(`${this.uri}/user`, newUser, this.httpOptions);
  }

  updateUserByGannonID(gannon_id: String, gmail: String, userType: String, authenticated: boolean){
    const updatedUser = {
      gmail: gmail,
      userType: userType,
      gannon_id: gannon_id,
      authenticated: authenticated
    }
    return this.http.patch(`${this.uri}/user/gmail/${gmail}`, updatedUser, this.httpOptions);
  }
}
