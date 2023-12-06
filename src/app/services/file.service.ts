import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'http://localhost:8888/api';
  
  constructor(private http: HttpClient) { }
  
  
  uploadFile(file: File, department: string,id:number): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('department', department);
    formData.append('id', id.toString());
    
    return this.http.post(this.apiUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
      );
    }
    
    private getUploadProgress(event: any): number {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round((event.loaded / event.total) * 100);
        return percentDone;
      }
      return 0;
    }
    getAllDepartement(): Observable<any> {
      return this.http.get<String[]>(this.apiUrl + '/departments');
    }
    
    getFiles(): Observable<any> {
      return this.http.get<File[]>(this.apiUrl + '/files');
    }
    getFilesBydepartement(departementName: string): Observable<any> {
      return this.http.get<File[]>(this.apiUrl + '/files/' + departementName);
    }

    getFilesById(id: number): Observable<any> {
      return this.http.get<any>(this.apiUrl + '/file-by-id/' + id);
    }


  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    return this.http.get(this.apiUrl + `/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }


}
