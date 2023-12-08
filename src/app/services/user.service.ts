import { Injectable } from '@angular/core';
import { UserDto, UserDto1 } from '../components/user-list/user-list.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../entities/department';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:8888/api/Users'; // Replace with your actual backend API URL
  private apiUrl2 = 'http://localhost:8888/api';
  private apiUrl3 = 'http://localhost:8888/api/User';

  constructor(private http: HttpClient) {}

  // user.service.ts
  getUsersWithDepartments(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl2}/Users2`);
  }
  // Add a new method to fetch departments
  getDepartments2(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl2}/Departments`);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }
  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl3}/${id}`);
  }

  createUser(newUser: { nomComplet: string;  email: string;  role :string;password: string; department_id: number },id:number): Observable<any> {
    return this.http.post(`${this.apiUrl2}/newUser/${id}`, newUser, { responseType: 'text' });
  }
  
  updateUser(id: number, updatedUser: UserDto1, depId: number): Observable<any> {
    return this.http.put(`${this.apiUrl2}/updateUser/${id}/${depId}`, updatedUser, { responseType: 'text' });
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/deleteUser/${id}`);
  }
}

