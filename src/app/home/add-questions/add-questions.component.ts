import { Component, Inject, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  form: FormGroup;

  newQuestion: any

  
 

  constructor (private quizService: QuizService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
) {
this.form = this.fb.group (
{
id: new FormControl(''),
quizQuestion: new FormControl('', [Validators.required]),
quizAnswer: new FormControl('', [Validators.required]),
}
)
}

ngOnInit(): void {
 this.form.patchValue(this.data)
}

onFormSubmit () {
  if (this.form.valid) {
    if (this.data) {
    
      this.quizService.updateQuiz(this.form.value).subscribe({
       
        next: (val:any) => {
          this.coreService.openSnackBar("Quiz information updated")
          this.dialogRef.close(true);

          
                  
        }, 
        error: (err:any) => {
          console.error(err)
        
        }

      })
    } else {
      // this.quizService.addNewQuestion(this.form.value).subscribe({
      //   next: (val:any) => {
      //     this.coreService.openSnackBar("Question added")
      //     this.dialogRef.close(true);
      //     console.log(this.form.value)
      //   }, 
      //   error: (err:any) => {
      //     console.error(err)
      //   }

      // })

      this.quizService.getSingleQuestion(1,1).subscribe({
        next: (val:any) => {
          this.coreService.openSnackBar("Question fetched")
          this.dialogRef.close(true);
          console.log(val)
        
        }, 
        error: (err:any) => {
          console.error(err)
        }

      })
    
    }
  }
}

}
