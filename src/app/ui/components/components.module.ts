import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { BooksModule } from './books/books.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomeModule,
    BooksModule
  ],
  exports:[
    HomeModule,
    BooksModule
  ]
})
export class ComponentsModule { }
