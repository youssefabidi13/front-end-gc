import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../entities/department';
import { DepartmentDto } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private apiUrl = 'http://localhost:8888/api/Departments'; // Remplacez par l'URL de votre API backend
  private apiUrl2 = 'http://localhost:8888/api';
  private apiUrl3 = 'http://localhost:8888/api/Department';
  
  
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }
  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl3}/${id}`);
  }
  createDepartment(newDepartment: { nomDepartement: string; descriptionDepartement: string; }): Observable<any> {
    return this.http.post(this.apiUrl2 + '/newDepartment', newDepartment);
  }
  getDepartment2(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  updateDepartment(updatedDepartment: DepartmentDto): Observable<any> {
    return this.http.put(`${this.apiUrl2}/updatedepartment/${updatedDepartment.idDepartement}`, updatedDepartment);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/deletedepartment/${id}`);
  }
}

// export interface Department {
//   idDepartement: number;
//   code: string;
//   nomDepartement: string;
//   descriptionDepartement: string;
// }