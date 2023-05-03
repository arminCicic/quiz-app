import { Component, Inject, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  form: FormGroup;

  
 

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor (private quizService: QuizService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
) {
this.form = this.fb.group (
{
id: new FormControl(''),
quizName: new FormControl('', [Validators.required]),
}
)
}

ngOnInit(): void {
 this.form.patchValue(this.data)
}

onFormSubmit () {
    if (this.form.valid) {
      this.quizService.addQuiz(this.form.value).subscribe({
        next: (val:any) => {
          this.coreService.openSnackBar("Quiz added")
          this.dialogRef.close(true);
          console.log(this.form.value)
        }, 
        error: (err:any) => {
          console.error(err)
        }
      })  
     }
}

}
