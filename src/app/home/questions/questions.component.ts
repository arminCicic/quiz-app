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
  
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  questions: any[] = [];




  quizId!: number;


  displayedColumns: string[] = [
    'id', 
    'quizz',
    'question', 
    'answer',
    'action'
    ];


  constructor (   
    private router: Router,        
    private route: ActivatedRoute,
    private quizService: QuizService,
    private coreService: CoreService,
    private location: Location                          
  
  
) {
 
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = +params['id']; // (+) converts string 'id' to a number
     
    });
    this.getQuestionsList()

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getQuestionsList() {
    this.quizService.getQuestionsList().subscribe({
      next: (res) => {
        this.questions = res;
        
      }, 
      error: (err) => {
        console.log(err)
      }
    })

 
  }

  addQuestion(question: object) {
    this.quizService.addRecycledQuestion(question, this.quizId).subscribe({        

      next: (val:any) => {
        this.coreService.openSnackBar("Question added")
               
      }, 
      error: (err:any) => {
        console.error(err)
      }

    })
  }

  goBack(): void {
    this.location.back();
  }

}
