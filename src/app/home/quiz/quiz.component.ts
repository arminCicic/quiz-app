import { AfterViewInit, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, {Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import { QuizService } from 'src/app/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionsComponent } from '../add-questions/add-questions.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../../core/core.service';





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
    private router: Router,        
    private route: ActivatedRoute,
    private dialog: MatDialog,  
    private coreService: CoreService,
                       
  
  
) {}



  ngAfterViewInit() {   
  
      
  } 

  showAnswer(question: any) {
    question.answerVisible = !question.answerVisible;
  }
  
  


  openAddQuestionsForm() {
    const dialogRef = this.dialog.open(AddQuestionsComponent, {
      data: {
        quizId: this.quizId,
        isEditing: false,
      }
    });
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

    
    this.quizService.questionAdded$.subscribe(() => {
      this.reloadQuestions();
    });
   

  }

  reloadQuestions() {
    this.getQuizQuestions();
  }

  getQuizQuestions() {
    this.quizService.getQuizQuestions(this.quizId).subscribe((questions: any[]) => {
      this.questions = questions;
     
    });
    
  }

  deleteQuestion(id:number) { 
    
      this.quizService.deleteQuestion(id).subscribe({
        next: (res) => {
         this.coreService.openSnackBar("Employee deleted", "done")
         this.reloadQuestions();
         
        },
        error: (err) => {
          console.log(err)
        } 
      })     
     
  }

  // iako sam iskomentarisao update/edit funkciju u add-questions ts, ipak otvara edit samo
  //uvijek prepoznaje da ima data, ne otvara edit nego samo ostane naziv edit, ovako sad stanje radi add questions
  // razdvoji logiku za edit i add questions i to je to
  // stavi da postoji jos is editing opcija i stavi data && isEditing i onda nekad udje u edit tek

  openEditForm(data:any, id:any) {
    
    const dialogRef = this.dialog.open(AddQuestionsComponent, {
      id: id,
      data: data,     
      
  
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.reloadQuestions();
        }
      }
    })

  } 

  openQuestions(id:number) {
    this.router.navigate(['/questions', id]);
   
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
