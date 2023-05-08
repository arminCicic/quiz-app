import { Component, OnInit} from '@angular/core';
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
 })
export class QuizComponent implements OnInit {   

  
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

  showAnswer (question: any) {
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
     // get the quiz ID from the URL and load the quiz questions
     this.route.params.subscribe(params => {
       this.quizId = +params['id']; // (+) converts string 'id' to a number
       this.getQuizQuestions();
      });
      
      // subscribe to an event that indicates a new question has been added to the quiz
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
