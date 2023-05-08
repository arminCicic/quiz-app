import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map, forkJoin, switchMap, Subject, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private questionAddedSource = new Subject<void>();
  questionAdded$ = this.questionAddedSource.asObservable();

  addQuestion() {
    this.questionAddedSource.next();
  }

  constructor(private _http:HttpClient) { }

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
    // return this._http.post(`http://localhost:3000/questions`, data).pipe(
    //   mergeMap((res: any) => {
    //     // second POST request to add the question to all quizzes
    //     return this._http.post(`http://localhost:3000/allQuestions`, data);
    //   })
    // );
  }
  

  public addRecycledQuestion(question: object, id: number): Observable<any> {
    const data = {
      ...question, // Spread the original question object
      id: "",
      quizId: id // Update the quizId property with the passed id parameter
    };

    console.log(data)
  
    return this._http.post(`http://localhost:3000/questions`, data);
  }
  

  public updateQuestion(data: any): Observable<any> {   
    const id = data.id; 
    return this._http.put(`http://localhost:3000/questions/${id}`, data);  
  }

  public  deleteQuestion(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/questions/${id}`)
  }
  
  

  public getSingleQuestion(id: number, questionId: number): Observable<any> {
    return this._http.get(`http://localhost:3000/items/${id}`).pipe(
      map((quiz: any) => {
        const question = quiz.questions.find((q: any) => q.id === questionId);
        return {
          question: question.question,
          answer: question.answer
        }
      })
    );
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
