import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../book';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { BookService } from '../book.service';
import { BookCategory } from '../book-category';
import { BookcategoryService } from '../bookcategory.service';

@Component({
  selector: 'app-book-ops',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf, NgFor],
  templateUrl: './book-ops.component.html'
})
export class BookOpsComponent implements OnInit {
  guid: string | null
  summary: string = ''
  categories:BookCategory[] = []
  // book: Book = {
  //   guid: '',
  //   title: '',
  //   author: '',
  //   categoryId: 0,
  //   date: '',
  //   isPublished: false
  // }بصورت tempelete driven

  // bookForm = new FormGroup({
  //   guid: new FormControl(''),
  //   title: new FormControl(''),
  //   author: new FormControl(''),
  //   categoryId: new FormControl(0),
  //   date: new FormControl(''),
  //   isPublished: new FormControl(false)
  // })نسخ اولیه

  bookForm!: FormGroup//نسخ جدید

  constructor(private readonly activatedroute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly bookCategoryService: BookcategoryService) {
    this.bookForm = formBuilder.group({
      guid: [''],
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      categoryId: [0],
      date: [''],
      isPublished: [false]
    })
    this.categories = bookCategoryService.list()
    this.guid = activatedroute.snapshot.paramMap.get('guid')
    console.log(this.guid)

    this.bookForm.valueChanges.subscribe(data => {
      this.summary = `title:${data.title}, author:${data.author}, categoryid:${data.categoryId}, date:${data.date}, ispublished:${data.isPublished}`
    })
    // this.bookForm.get('title')?.valueChanges.subscribe(data => {
    //   console.log(data)
    // });
  }
  ngOnInit(): void {
    this.guid = this.activatedroute.snapshot.paramMap.get('guid')
    if (this.guid) {
      const book = this.bookService.find(this.guid)!
      this.bookForm.patchValue(book)
    }
  }

  get title() {
    return this.bookForm.get('title')
  }

  get author() {
    return this.bookForm.get('author')
  }

  submit() {
    if (this.bookForm.invalid) {
      alert('Data Is Invalid')
    }
    const command = this.bookForm.value
    if (this.guid) {
      this.bookService.edit(command)
    }
    else {
      command.guid = crypto.randomUUID()
      this.bookService.add(command)
    }
    this.router.navigateByUrl('/book-list')
  }
} 0
