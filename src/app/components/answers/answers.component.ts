import { Component, OnInit } from '@angular/core';
import { CurrentQuizService } from '../../services/current-quiz.service';
import { QuestionToShow, Quiz } from '../../models/quiz.model';
import { Router } from '@angular/router';
@Component({
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit {
  questions: QuestionToShow[] = [];
  totalPoint: number = 0;

  constructor(
    public currentQuizService: CurrentQuizService,
    private router: Router
  ) {}

  ngOnInit() {
    this.questions = this.currentQuizService.getCurrentQuiz;
    if (this.questions.length === 0) {
      this.router.navigateByUrl('/questions');
    }
    this.questions.forEach((answer) => {
      if (answer.user_anser === answer.correct_answer) {
        this.totalPoint += 1;
      }
    });
  }

  startAgain() {
    this.router.navigateByUrl('/questions');
  }
}
