import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiscService {






  constructor(private http: HttpClient) { }

  downloadImage(filename: string): Observable<Blob> {
    return this.http.get(`http://localhost:8081/api/misc/downloadImage?file=${filename}`, { responseType: 'blob' });
  }


  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`http://localhost:8081/api/misc/uploadImage`, formData);
  }

}

