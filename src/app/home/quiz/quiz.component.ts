import { Component, Inject, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Autoplay, Pagination, Navigation } from "swiper";
import Swiper from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizService } from 'src/app/services/quiz.service';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';




@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizComponent {


  constructor (
    // private quizService: QuizService,
    private dialog: MatDialog,  
    // private coreService: CoreService,
    // private router: Router                            
  
  
) {}

  questions = [
    {
      name: "Question 1",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique. 1"
    },
    {
      name: "Question 2",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    },
    {
      name: "Question 3",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    },
    {
      name: "Question 4",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    },
    {
      name: "Question 5",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac ante justo. Vestibulum tincidunt dolor vitae magna cursus, vel dignissim mauris tristique."
    }
  ];
  


  answerVisible = [false, false, false];

  swiper: Swiper | undefined;

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper', {
     
      direction: 'horizontal',
      loop: true,

           
      pagination: {
        el: '.swiper-pagination',
      },
      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });   
   
  } 

  showAnswer(index: number) {
    this.answerVisible[index] = !this.answerVisible[index];
  }


  openAddQuestionsForm() {
    const dialogRef = this.dialog.open(AddQuestionsComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
         console.log("added question")
        }
      }
    })
  }

}
