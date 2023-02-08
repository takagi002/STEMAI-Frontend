import { NgModule } from  '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
imports: [MatCardModule, FormsModule],
exports: [MatCardModule, FormsModule],

})

export  class  MyMaterialModule { }