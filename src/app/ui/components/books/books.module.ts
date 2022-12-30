import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { Routes } from '@angular/router';

const routes:Routes=[
  {path:'',component:BooksComponent}
]

@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BooksComponent
  ]
})
export class BooksModule { }
