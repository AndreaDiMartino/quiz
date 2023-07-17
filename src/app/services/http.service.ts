import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = {
    categoriesUrl: 'https://opentdb.com/api_category.php',
    questionsUrl: 'https://opentdb.com/api.php?amount=5&type=multiple',
  };

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.url.categoriesUrl);
  }

  getQuestions(category: number, difficult: string): Observable<Quiz> {
    return this.http.get<Quiz>(
      this.url.questionsUrl +
        '&category=' +
        category +
        '&difficulty=' +
        difficult
    );
  }
}
