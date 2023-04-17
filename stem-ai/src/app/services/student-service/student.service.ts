import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  uri: String  = environment.backendURI;
  
  
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private http: HttpClient) { }

  getStudent(student_id: string) {
    return this.http.get(`${this.uri}/student/studentID/${student_id}`);
  }
}
