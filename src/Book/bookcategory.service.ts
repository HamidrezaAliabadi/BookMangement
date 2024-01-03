import { Injectable } from '@angular/core';
import { Book } from './book';
import { LocalStorageService } from '../app/shared/local-storage.service';
import { BookCategory } from './book-category';

@Injectable({
  providedIn: 'root'
})
export class BookcategoryService {

  private bookcategories: BookCategory[] = []

  list(): BookCategory[] {
    return [{
      id: 1,
      title: 'Programing'
    },
    {
      id: 2,
      title: 'Testing'
    },
    {
      id: 2,
      title: 'Architecture'
    }]
  }
}
