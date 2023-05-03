import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuizService } from 'src/app/services/quiz.service';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'id', 
    'quizName', 
    'action'
    ];

   

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
   

    constructor (private quizService: QuizService,
                  private dialog: MatDialog,                
                
                
      ) {      
      }

      ngOnInit(): void {
        this.getQuizList()
        
      }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getQuizList() {
    this.quizService.getQuizList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteQuiz(id:number) {
    // this.empService.deleteEmployeeList(id).subscribe({
    //   next: (res) => {
    //    this.coreService.openSnackBar("Employee deleted", "done")
    //     this.getEmployeeList();
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   } 
    // })
    console.log("employee deleted")
   }
  
   openEditForm(data:any, id:any, event:Event) {
  //  const dialogRef = this.dialog.open(AddEditComponent, {
  //     id: id,
  //     data: data,
  
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.getEmployeeList();
  //       }
  //     }
  //   })

  const isActionColumnButton = (event.target as HTMLElement).closest('.action-btn') !== null;
  if (!isActionColumnButton) {
    event.stopPropagation()
    console.log("Ready for Edit")
  }
  }

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

  


}
