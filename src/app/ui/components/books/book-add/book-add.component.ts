import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  addForm: FormGroup;
  file:any;
  currentImage:string=""
  formData:any
  constructor(private formBuilder: FormBuilder,private bookService:BookService,private toastr:ToastrService,
    private router:Router) { }
  ngOnInit(): void {
    this.createAddForm()
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
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
  add() {
    if(this.addForm.valid){
      let result=this.bookService.add(this.formData,this.addForm.value)
      console.log(result)
      if(result){
        this.addForm.reset()
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
