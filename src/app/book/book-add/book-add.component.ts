import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  // @ts-ignore
  bookForm: FormGroup;
  id =0;
  isbn = '';
  book = '';
  author = '';
  description = '';
  publisher = '';
  published = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      'id' : [null, Validators.required],
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'description' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'published' : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    this.api.addBook(this.bookForm.value)
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(['/book-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


}
