import { Component, Inject, OnInit} from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

// Set isEditing to this.data.isEditing if it's not undefined, otherwise set it to true
  isEditing: boolean = this.data?.isEditing ?? true;

  form: FormGroup;
  quizId: number;  
  private subscription: Subscription = new Subscription();



  constructor( private quizService: QuizService,
                private fb: FormBuilder,
                private dialogRef: MatDialogRef<AddQuestionsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private coreService: CoreService
) {
   // create form controls and group them into a form group
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

}


ngOnInit(): void {
  // populate the form with the data passed through dialog data
 this.form.patchValue(this.data) 
}

ngOnDestroy(): void {
    // unsubscribe from any subscriptions to prevent memory leaks
  this.subscription.unsubscribe();
}


onFormSubmit () {

  if (this.form.valid) {
    if (this.data && this.isEditing) {

       // if editing an existing question, update the question through the quiz service    
        this.quizService.updateQuestion(this.form.value).subscribe({   
       
        next: (val:any) => {
          this.coreService.openSnackBar("Question information updated")
          this.dialogRef.close(true);          
                  
        }, 
        error: (err:any) => {
          this.coreService.openSnackBar("Failed to update question. Please try again later.", "error");
          console.error(err)        
        }
      })

    } else {
      // if adding a new question, add it through the quiz service
      this.quizService.addNewQuestion(this.form.value).subscribe({ 

        next: (val:any) => {
          this.coreService.openSnackBar("Question added")
          this.dialogRef.close(true);
         
        }, 
        error: (err:any) => {
          this.coreService.openSnackBar("Failed to add question. Please try again later.", "error");
          console.error(err)
        }

      })   
       // emit an event to notify that a question has been added
      this.quizService.addQuestion();   
   } 
  }
 }
}

