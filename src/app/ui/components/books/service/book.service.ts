import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BookModel } from '../model/bookModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    @Inject("apiUrl") private apiUrl:string,
    private http:HttpClient,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService
  ) { }
  add(file:any,bookModel:BookModel):boolean{
    this.spinner.show()
    let api=this.apiUrl+"books/addImage"

    this.http.post(api,file).subscribe((res:any)=>{
      let fileName=res.fileName
      bookModel.imageUrl=fileName

      let api=this.apiUrl+"books/add"
      this.http.post(api,bookModel).subscribe((res:any)=>{
        this.spinner.hide()
        this.toastr.success(res.message)
        return true
      },
      (err)=>{
        this.spinner.hide()
        return false
      })
    }, (err)=>{
      this.spinner.hide()
      return false
    })
    return true
  }
  getList(){
    let api=this.apiUrl+"books/getlist";
    return this.http.get(api)
  }
  delete(bookModel:BookModel){
    let api=this.apiUrl+"books/delete"
    return this.http.post(api,bookModel)
  }
  getByGuid(guid:string){
    let api=this.apiUrl+"books/books/getByGuid?guid="+guid
    return this.http.get(api)
  }
}
