import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfessorClassesService {
  

  uri: String  = environment.backendURI;

  constructor(private http: HttpClient) { }

  getProfessorClasses(prof_id: string) {
    return this.http.get(`${this.uri}/professorClass/classes/${prof_id}`);
  }

  getStudentsInClass(currentClass: any) {
    return this.http.get(`${this.uri}/professorClass/students/${currentClass}`);
  }
}
