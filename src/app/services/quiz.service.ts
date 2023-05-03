import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public addQuiz(data: any): Observable<any> {
    // data.id = undefined;
    return this._http.post("http://localhost:3000/quizzes", data)
  }

 public updateQuiz(data: any): Observable<any> {
    return this._http.put("https://localhost:7054/api/QuizsManager", data);
  }

  public getQuizList(): Observable<any> {
    return this._http.get('http://localhost:3000/quizzes');
  }

public  deleteQuizList(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7054/api/QuizsManager/${id}`)
  }
}
