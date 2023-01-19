import { Component, OnInit } from '@angular/core';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BookModel } from './model/bookModel';
import { BookService } from './service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books:BookModel[]=[]
  constructor(private bookService:BookService,
              private spinner:NgxSpinnerService
    ){}
  ngOnInit(): void {
    this.getList()
  }
  getList(){
    this.spinner.show()
    this.bookService.getList().subscribe((res:any)=>{
      this.spinner.hide()
      this.books=res.data;
    },(err)=>{

    })
  }
  delete(bookModel:BookModel){
    this.spinner.show()
    this.bookService.delete(bookModel).subscribe((res:any)=>{
      this.spinner.hide()
      this.getList()
    })
  }
  edit(){
    
  }
}
