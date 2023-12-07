import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResignationService {
  private apiUrl = 'http://localhost:8888/api'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  submitResignation(resignation: any,id:number): Observable<any> {
    console.log("hello "+ resignation.departureDate);
    const url = `${this.apiUrl}/users/${id}/resignation`; 
    return this.http.post(url, resignation);
  }

  getPendingResignations(): Observable<ResignationDto[]> {
    return this.http.get<ResignationDto[]>(`${this.apiUrl}/admin/resignations`);
  }
  approveResignation(resignationId: number): Observable<any> {
    const url = `${this.apiUrl}/admin/${resignationId}/approve`;
    return this.http.post(url, {});
  }
  rejectResignation(resignationId: number): Observable<any> {
    const url = `${this.apiUrl}/admin/${resignationId}/reject`;
    return this.http.put(url, {});
  }
}

export interface ResignationDto {
  resignationId: number;
  nomUtilisateur: string;
  reason: string;
  departureDate: string;
  requestDate: string;
}
