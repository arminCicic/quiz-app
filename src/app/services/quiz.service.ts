import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, Subject, switchMap, forkJoin } from 'rxjs';
import { Question } from 'src/interfaces/question-interface';
import { Quiz } from 'src/interfaces/quiz-interface';

@Injectable({
  providedIn: 'root'
})



export class QuizService {


  private questionAddedSource = new Subject<void>();
  questionAdded$ = this.questionAddedSource.asObservable();

  constructor(private _http:HttpClient,private apiService: ApiService) { }

  addQuestion() {
    this.questionAddedSource.next();
  }

  public addQuiz(data: Quiz): Observable<any> {
    return this._http.post(`${this.apiService.baseUrl}/items`, data)
  }

 public updateQuiz(data: Quiz): Observable<any> {
  const id = data.id; 
   return this._http.put(`${this.apiService.baseUrl}/items/${id}`, data);    
  }

  public getQuizList(): Observable<any> {
    return this._http.get(`${this.apiService.baseUrl}/items`);
  }


  public deleteQuiz(id: number): Observable<any> {
    return this._http.delete(`${this.apiService.baseUrl}/items/${id}`);   
   } 

  

 public deleteQuizQuestions(quizId: number): Observable<any> {
 
   // Fetch all questions from the API
    return this._http.get<any[]>(`${this.apiService.baseUrl}/questions`).pipe(
      // Filter questions with matching quizId
      map((questions: any[]) => questions.filter((question: any) => question.quizId === quizId)),
      // Delete filtered questions from the API
      switchMap((filteredQuestions: any[]) =>
        forkJoin(filteredQuestions.map((question: any) =>
          this._http.delete(`${this.apiService.baseUrl}/questions/${question.id}`)
        ))
      )
    );
  
  }
  

  public addNewQuestion(data: Question): Observable<any> {
    // Make a POST request to /questions
    return this._http.post(`${this.apiService.baseUrl}/questions`, data).pipe(
      // After the POST request is successful, make a POST request to /allQuestions
      switchMap((response: any) => this._http.post(`${this.apiService.baseUrl}/allQuestions`, response))
    );
  }
  



  public addRecycledQuestion(question: object, id: number): Observable<any> {
    const data = {
      ...question, // Spread the original question object
      id: "",
      quizId: id // Update the quizId property with the passed id parameter
    };  
    return this._http.post(`${this.apiService.baseUrl}/questions`, data);
  }
  

  public updateQuestion(data: Question): Observable<any> {   
    const id = data.id; 
    return this._http.put(`${this.apiService.baseUrl}/questions/${id}`, data);  
  }

  public  deleteQuestion(id: number): Observable<any> {
    return this._http.delete(`${this.apiService.baseUrl}/questions/${id}`)
  } 
  
  public getQuizQuestions(quizId: number): Observable<any> {
    return this._http.get(`${this.apiService.baseUrl}/questions`).pipe(
      map((questions: any) => {
        return questions.filter((question: any) => question.quizId === quizId);
      })
    );
  }

  public getRecycledQuestionsList(): Observable<any> {
    return this._http.get(`${this.apiService.baseUrl}/allQuestions`);
  }

}
