import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  
  uri: String  = environment.backendURI;

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }

  constructor(private http: HttpClient) { }

  sendRecEmail(recipient: string, courseName: string, professor: string) {
    const recInfo = {
      recipient: recipient,
      courseName: courseName,
      professor: professor
    }
    return this.http.post(`${this.uri}/email/rec`, recInfo, this.httpOptions);
  }

}
