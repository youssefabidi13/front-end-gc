import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  // file-upload.service.ts
uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  // Update the URL to your backend endpoint
  return this.http.post<any>('http://localhost:8888/api/users/upload', formData);
}
}
