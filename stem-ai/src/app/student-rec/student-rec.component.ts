import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ClassService } from '../services/class-service/class.service';

@Component({
  selector: 'app-student-rec',
  templateUrl: './student-rec.component.html',
  styleUrls: ['./student-rec.component.css']
})
export class StudentRecComponent implements OnInit{
  constructor(private classService: ClassService) {}

  classes: any = [];

  ngOnInit() {
    this.classService.getClasses().subscribe(res => {
      this.classes = res;
      console.log(this.classes);
    })  
  }
}
