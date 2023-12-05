import { Injectable } from '@angular/core';
import { Feedback } from '../entities/feedback';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http:HttpClient,private router:Router) { }

  addFeedback(fileId : number,feedback:Feedback):Observable<Feedback> {
    return this.http.post<Feedback>('http://localhost:8888/api/feedback/add/'+fileId,feedback);
  }

}
