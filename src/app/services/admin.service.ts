import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http:HttpClient,private router:Router) { }

  private baseUrl="http://localhost:8888/admin/";

  public getNumberOfUsers():Observable<number>{
    return this.http.get<number>(this.baseUrl+"number-users");
  }

  public getNumberOfDepartments():Observable<number>{
    return this.http.get<number>(this.baseUrl+"number-departments");
  }
  public getNumberOfSkills():Observable<number>{
    return this.http.get<number>(this.baseUrl+"number-competences");
  }
  public getNumberOfCourses():Observable<number>{
    return this.http.get<number>(this.baseUrl+"number-formations");
  }

  getNumberOfEmployeesByDepartment(): Observable<DepartmentEmployeeCount[]> {
    return this.http.get<DepartmentEmployeeCount[]>(this.baseUrl+"employeesByDepartment");
  }
  getUsersByCompetence(): Observable<CompetenceUserCount[]> {
    return this.http.get<CompetenceUserCount[]>(this.baseUrl+"usersByCompetence");
  }

  getAllFeedbacks():Observable<any>{
    return this.http.get<any>(this.baseUrl+"all-rating");
  }

  getAllFeedbacksRating():Observable<any>{
    return this.http.get<any>(this.baseUrl+"all-rating-numbers");
  }
}
export interface DepartmentEmployeeCount {
  department: string;
  employeeCount: number;
}
export interface CompetenceUserCount {
  competenceName: string;
  userCount: number;
}
