import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class QuizService {

  private questionAddedSource = new Subject<void>();
  questionAdded$ = this.questionAddedSource.asObservable();

  constructor(private _http:HttpClient) { }

  addQuestion() {
    this.questionAddedSource.next();
  }

  public addQuiz(data: any): Observable<any> {
    return this._http.post("http://localhost:3000/items", data)
  }

 public updateQuiz(data: any): Observable<any> {
  const id = data.id; 
   return this._http.put(`http://localhost:3000/items/${id}`, data);    
  }

  public getQuizList(): Observable<any> {
    return this._http.get('http://localhost:3000/items');
  }

  public deleteQuiz(id: number): Observable<any> {
   return this._http.delete(`http://localhost:3000/items/${id}`);   
  }
  

  public addNewQuestion(data: any): Observable<any> {  
    return this._http.post(`http://localhost:3000/questions`, data);        
  }
  

  public addRecycledQuestion(question: object, id: number): Observable<any> {
    const data = {
      ...question, // Spread the original question object
      id: "",
      quizId: id // Update the quizId property with the passed id parameter
    };  
    return this._http.post(`http://localhost:3000/questions`, data);
  }
  

  public updateQuestion(data: any): Observable<any> {   
    const id = data.id; 
    return this._http.put(`http://localhost:3000/questions/${id}`, data);  
  }

  public  deleteQuestion(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/questions/${id}`)
  } 
  
  public getQuizQuestions(quizId: number): Observable<any> {
    return this._http.get(`http://localhost:3000/questions`).pipe(
      map((questions: any) => {
        return questions.filter((question: any) => question.quizId === quizId);
      })
    );
  }

  public getQuestionsList(): Observable<any> {
    return this._http.get('http://localhost:3000/questions');
  }

}
