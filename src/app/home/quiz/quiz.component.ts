import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { QuizService } from 'src/app/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuizComponent implements OnInit, AfterViewInit {  

  
  answerVisible: boolean[] = [];
  quizId!: number;
  questions: any[] = [];

  currentIndex = 0;
  


  constructor (
    private quizService: QuizService,
    private route: ActivatedRoute,
    private dialog: MatDialog,  
    // private coreService: CoreService,
    // private router: Router                          
  
  
) {}


//  swiper!: Swiper;

  ngAfterViewInit() {
    // this.swiper = new Swiper('.swiper', {
     
    //   direction: 'horizontal',
    //   loop: true,
  
           
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
      
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
  
    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //   },
    // }); 

      
  } 

  showAnswer(question: any) {
    question.answerVisible = !question.answerVisible;
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = +params['id']; // (+) converts string 'id' to a number
      this.getQuizQuestions();
    });

   
  }

  getQuizQuestions() {
    this.quizService.getQuizQuestions(this.quizId).subscribe((questions: any[]) => {
      this.questions = questions;
      console.log(questions)
    });

    
  }


  prevSlide() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.questions.length - 1;
    }
  }

  nextSlide() {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      this.currentIndex = 0;
    }
  }
    

}
