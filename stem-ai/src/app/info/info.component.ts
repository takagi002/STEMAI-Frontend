import { Component } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  constructor(private router: Router) { }
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
