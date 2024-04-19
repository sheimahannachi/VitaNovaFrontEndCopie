import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class MiscService {


  private baseUrl: string = 'http://localhost:8081/api';



  constructor(private http: HttpClient) { }




  checkIpAddress( username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/CheckIpAddress?username=${username}`);
  }


  encrypt(value: string, key: string): string {
    
    const keyWordArray = CryptoJS.enc.Utf8.parse(key);
    
   
    const encrypted = CryptoJS.TripleDES.encrypt(value, keyWordArray, {
      mode: CryptoJS.mode.ECB, 
      padding: CryptoJS.pad.Pkcs7 
    });
    
  
    const encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    
    return encryptedBase64;
  }

}
