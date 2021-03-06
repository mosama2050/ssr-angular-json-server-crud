import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {


  // @ts-ignore
  book: Book = {
     id: '',
    isbn: '',
    title: '',
    author: '',
    description: '',
    publisher: '',
    published: '123',
    // @ts-ignore
    updatedAt: null
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getBookDetails(this.route.snapshot.paramMap.get('id'));
  }

  getBookDetails(id: any): void {
    this.api.getBook(id)
      .subscribe((data: any) => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
      });
  }

  deleteBook(id: any): void {
    this.isLoadingResults = true;
    this.api.deleteBook(id)
      .subscribe(() => {
          this.isLoadingResults = false;
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
