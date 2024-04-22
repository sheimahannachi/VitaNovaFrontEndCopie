import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginRequest } from '../front-office/user/login/LoginRequest';
import { UserInfoResponse } from '../front-office/user/login/UserInfoResponse';
import { UserModule } from '../Models/user.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api'; // Update this with your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  authenticateAndGetToken(authRequest: LoginRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.baseUrl}/generateToken`, authRequest);
  }

  getUserInfoFromToken(): Observable<UserModule> {
    const token = sessionStorage.getItem('token');
    console.log(token); // Ensure token is retrieved from sessionStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserModule>(`${this.baseUrl}/getuserfromtoken`, { headers, withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error fetching user info from token:', error);
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
  }
  
  logoutUser(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
  
    // Clear sessionStorage
    sessionStorage.clear();
    return this.http.get<any>(`${this.baseUrl}/signout`, { headers, withCredentials: true });
  }
  

  logoutAndRedirect(): void {
    this.logoutUser().subscribe(response => {
      console.log('Logout successful!', response);
      this.router.navigate(['/login']); 
    }, error => {
      console.error('Logout failed!', error);
    });
  }
}
