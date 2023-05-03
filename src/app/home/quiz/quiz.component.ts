import { Component } from '@angular/core';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  answerVisible = false;

  showAnswer() {
    this.answerVisible = !this.answerVisible;
  }



}
