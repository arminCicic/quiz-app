import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { QuizService } from 'src/app/services/quiz.service';
import { CoreService } from '../../core/core.service';
import { Question } from 'src/interfaces/question-interface';
import { Quiz } from 'src/interfaces/quiz-interface';







@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  dataSource!: MatTableDataSource<Quiz>;

  displayedColumns: string[] = [
    'id', 
    'quizName', 
    'action'
    ];
   
 // Get view child elements for sorting and pagination
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
   

    constructor (private quizService: QuizService,
                  private dialog: MatDialog,  
                  private coreService: CoreService,
                  private router: Router                            
                
                
      ) {}

      ngOnInit(): void {
        this.getQuizList()
        
      }


  // Apply filter to data source when filter is changed
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // Get quiz list from quiz service
  getQuizList() {
    this.quizService.getQuizList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 
      error: (err) => {
        this.coreService.openSnackBar("Failed to load quiz list. Please try again later.", "error");
        console.log(err);
      }
    })
  }


   // Delete quiz with given ID
  deleteQuiz(id:number) {
    this.quizService.deleteQuiz(id).subscribe({
      next: (res) => {
       this.coreService.openSnackBar("Quiz deleted", "done")
        this.getQuizList();
      },
      error: (err) => {
        this.coreService.openSnackBar("Failed to delete quiz. Please try again later.", "error");
        console.log(err)
      } 
    })

    this.quizService.deleteQuizQuestions(id).subscribe({
      next: (res) => {
       this.coreService.openSnackBar("Quiz deleted", "done")
        this.getQuizList();
      },
      error: (err) => {
        this.coreService.openSnackBar("Failed to delete quiz. Please try again later.", "error");
        console.log(err)
      } 
    })
    
   }
  

     // Open dialog to edit quiz
   openEditForm(data:Question, id:string, event:Event) {
      // Stop event propagation if event originated from a button in the action column
    const isActionColumnButton = (event.target as HTMLElement).closest('.action-btn') !== null;
  if (isActionColumnButton) {
    event.stopPropagation()    
  } else {
    const dialogRef = this.dialog.open(AddQuizComponent, {
      id: id,
      data: data,
  
    });
     // Refresh quiz list if changes were made
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getQuizList();
        }
      }
    })

  }  
  
  }

 // Open dialog to add quiz
  openAddQuizForm() {
    const dialogRef = this.dialog.open(AddQuizComponent);
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        if (val) {
          this.getQuizList()
        }
      }
    })
  }

// Navigate to quiz component with quiz id
  openQuiz(id: number) {
    this.router.navigate(['/quiz', id]);
  }

}
