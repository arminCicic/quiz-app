import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizService } from 'src/app/services/quiz.service';
import { CoreService } from 'src/app/core/core.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit {
  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource!: MatTableDataSource<any>;
  questions: any[] = [];
   quizId!: number;
  displayedColumns: string[] = [
    'id', 
    'quizz',
    'question', 
    'answer',
    'action'
    ];
  subscription: any;


  constructor (   
    private router: Router,        
    private route: ActivatedRoute,
    private quizService: QuizService,
    private coreService: CoreService,
    private location: Location                          
  
  
) {}

  ngOnInit() {
    // Subscribing to changes in the route parameters and getting the quiz ID
    this.route.params.subscribe(params => {
      this.quizId = +params['id']; // (+) converts string 'id' to a number
     
    });
     // Fetching questions list
    this.getQuestionsList()

  }

  // filter data in the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    // unsubscribe from any subscriptions to prevent memory leaks
  this.subscription.unsubscribe();
}


  getQuestionsList() {
    this.quizService.getQuestionsList().subscribe({
      next: (res) => {
        this.questions = res;
        
      }, 
      error: (err) => {
        this.coreService.openSnackBar("Failed to get questions. Please try again later.", "error");
        console.log(err)
      }
    })

 
  }

  // add new question to quiz
  addQuestion(question: object) {
    this.quizService.addRecycledQuestion(question, this.quizId).subscribe({        

      next: (val:any) => {
        this.coreService.openSnackBar("Question added")
               
      }, 
      error: (err:any) => {
        this.coreService.openSnackBar("Failed to add question. Please try again later.", "error");
        console.error(err)
      }

    })
  }

  // navigate back to the previous page
  goBack(): void {
    this.location.back();
  }

}
