import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public addQuiz(data: any): Observable<any> {
    return this._http.post("http://localhost:3000/quizzes", data)
  }

 public updateQuiz(data: any): Observable<any> {
  const id = data.id; 
  return this._http.put(`http://localhost:3000/quizzes/${id}`, data);    
  }

  public getQuizList(): Observable<any> {
    return this._http.get('http://localhost:3000/quizzes');
  }

public  deleteQuiz(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/quizzes/${id}`)
  }

  public addNewQuestion(data: any): Observable<any> {
    return this._http.post("http://localhost:3000/allQuestions", data)
  }

  public getSingleQuestion(id: number, questionId: number): Observable<any> {
    return this._http.get(`http://localhost:3000/quizzes/${id}`).pipe(
      map((quiz: any) => {
        const question = quiz.questions.find((q: any) => q.id === questionId);
        return {
          question: question.question,
          answer: question.answer
        }
      })
    );
  }
  
}
