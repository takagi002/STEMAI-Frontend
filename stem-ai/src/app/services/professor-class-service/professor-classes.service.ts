import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})

export class ProfessorClassesService {
  

  uri: String  = environment.backendURI;

  constructor(private http: HttpClient) { }

  getProfessorClasses(prof_id: string, currentSemester: string) {
    return this.http.get(`${this.uri}/professorClass/classes/${prof_id}/${currentSemester}`);
  }

  getStudentsInClass(currentClass: any, currentSemester: string) {
    return this.http.get(`${this.uri}/professorClass/students/${currentClass}/${currentSemester}`);
  }
}
