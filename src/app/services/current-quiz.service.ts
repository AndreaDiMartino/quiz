import { Injectable } from '@angular/core';
import { QuestionToShow } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentQuizService {
  public questions: QuestionToShow[] = [];

  constructor() {}

  get getCurrentQuiz() {
    return this.questions;
  }

  setCurrentQuiz(questions: QuestionToShow[]) {
    this.questions = questions;
  }
}
