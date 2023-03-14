import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionServiceService {

  uri: String  = environment.backendURI;

  constructor(private http: HttpClient) { }


  //gets all student predictions related to given student ID
  getAllStudentPredictionsByStudentId(id: String) {
    return this.http.get(`${this.uri}/prediction/studentIDAll/${id}`);
  }
  
}
