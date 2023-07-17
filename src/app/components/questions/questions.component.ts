import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuestionToShow, Quiz } from '../../models/quiz.model';
import { Categories, Category } from '../../models/categories.model';
import { Levels } from '../../models/levels.model';
import { HttpService } from '../../services/http.service';
import { CurrentQuizService } from '../../services/current-quiz.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  form: FormGroup = new FormGroup({
    category: new FormControl(null, Validators.required),
    level: new FormControl(null, Validators.required),
  });
  categories: Category[] = [];
  levels: Levels[] = [
    { id: 'easy', name: 'easy' },
    { id: 'medium', name: 'medium' },
    { id: 'hard', name: 'hard' },
  ];
  questions: QuestionToShow[] = [];
  quizForm: FormGroup;

  constructor(
    public httpSevice: HttpService,
    public currentQuizService: CurrentQuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    return this.httpSevice
      .getCategories()
      .pipe(
        catchError((err) => {
          return throwError(() => {
            return err;
          });
        })
      )
      .subscribe((data: Categories) => {
        if (data.trivia_categories) {
          this.categories = data.trivia_categories;
        }
      });
  }

  getQuestions() {
    return this.httpSevice
      .getQuestions(
        this.form.get('category')?.value,
        this.form.get('level')?.value
      )
      .pipe(
        catchError((err) => {
          return throwError(() => {
            return err;
          });
        })
      )
      .subscribe((data: Quiz) => {
        if (data.results) {
          this.questions = [];
          let tempForm: { [key: string]: FormControl } = {};
          data.results.forEach((question, i) => {
            let tempAnswers: string[] = [];
            this.questions[i] = { ...question };
            tempAnswers = [...question.incorrect_answers];
            tempAnswers.push(question.correct_answer);
            this.questions[i]['answers'] = tempAnswers.sort(
              () => Math.random() - 0.5
            );
            tempForm['question_' + i] = new FormControl(
              null,
              Validators.required
            );
          });
          this.quizForm = new FormGroup(tempForm);
        }
      });
  }

  submitQuiz() {
    Object.entries(this.quizForm.value).forEach(([key, value], index) => {
      const user_anser = value as string;
      this.questions[index].user_anser = user_anser;
      this.questions[index].point =
        user_anser === this.questions[index].correct_answer ? 1 : 0;
      this.currentQuizService.setCurrentQuiz(this.questions);
      this.router.navigateByUrl('/answers');
    });
  }
}
