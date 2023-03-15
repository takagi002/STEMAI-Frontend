import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  uri: String  = environment.backendURI;

  constructor(private http: HttpClient) { }

  getClasses() {
    return this.http.get(`${this.uri}/class`);
  }
  
}
