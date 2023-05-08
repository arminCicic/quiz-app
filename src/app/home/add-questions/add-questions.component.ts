import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
  question = '';

  // Set isEditing to this.data.isEditing if it's not undefined, otherwise set it to true
  isEditing: boolean = this.data?.isEditing ?? true;


  form: FormGroup;


  quizId: number;

  

  // u form control dodajem quizId da bi znao koje pitanje u questions arreyu u bazi pripada kojem kvizu,
  // kako bi ih mogao brisati i editovai. A id on sam generise.
 

  constructor (private quizService: QuizService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
) {
this.form = this.fb.group (
{
id: new FormControl(''),
quizId: new FormControl(''),
quizQuestion: new FormControl('', [Validators.required]),
quizAnswer: new FormControl('', [Validators.required]),
answerVisible: false,


}
)
this.quizId = this.data.quizId;
// this.isEditing = this.data.isEditing;
}

ngOnInit(): void {
 this.form.patchValue(this.data)

 
}




onFormSubmit () {



  if (this.form.valid) {
    if (this.data && this.isEditing) {
      
    
      this.quizService.updateQuestion(this.form.value).subscribe({
   
       
        next: (val:any) => {
          this.coreService.openSnackBar("Question information updated")
          this.dialogRef.close(true);

          
                  
        }, 
        error: (err:any) => {
          console.error(err)
        
        }

      })
    } else {
         
      this.quizService.addNewQuestion(this.form.value).subscribe({        

        next: (val:any) => {
          this.coreService.openSnackBar("Question added")
          this.dialogRef.close(true);
         
        }, 
        error: (err:any) => {
          console.error(err)
        }

      })

    

      this.quizService.addQuestion();

   
}

}
}
}

