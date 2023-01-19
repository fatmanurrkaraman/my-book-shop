import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../service/book.service';
import {MatDialog,}
@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})

export class BookUpdateComponent implements OnInit{
  updateForm: FormGroup;
  file:any;
  currentImage:string=""
  formData:any
  constructor(private formBuilder: FormBuilder,private bookService:BookService,private toastr:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.createUpdateForm()
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0],
      name: ["", [Validators.required, Validators.minLength(3)]],
      writer: ["", [Validators.required, Validators.minLength(3)]],
      publishDate: ["", [Validators.required]],
      isActive: [true],
      isAvailable: [true],
      imageUrl: ["", [Validators.required, Validators.minLength(3)]],
      guid: ["guid"]
    })
  }
  getByGuid(){

  }
  update() {
    if(this.updateForm.valid){
      let result=this.bookService.add(this.formData,this.updateForm.value)
      console.log(result)
      if(result){
        this.updateForm.reset()
        this.router.navigate(["books"])
      }
    }else{
      this.toastr.error("Zorunlu alanları doldurun")
    }
  }
  setImage(event: any) {
    
    if (event.target.files && event.target.files[0]) {
      this.file=event.target.files[0]
      var reader= new FileReader();
      reader.onload=(event:any)=>{
        this.currentImage=event.target.result
      }
      reader.readAsDataURL(event.target.files[0])
      this.formData=new FormData;
      this.formData.append("file",this.file,this.file.name)
    }
  }
}
