import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../front-office/user/login/LoginRequest';
import { UserInfoResponse } from '../front-office/user/login/UserInfoResponse';
import { CookieService } from 'ngx-cookie-service';
import { UserModule } from '../Models/user.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/api'; // Update this with your backend URL

  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) { }

  authenticateAndGetToken(authRequest: LoginRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.baseUrl}/generateToken`, authRequest);
  }

  setJwtCookie(jwt: string): void {
    this.cookieService.set('jwtToken', jwt);
  }

  getUserInfoFromToken(): Observable<UserModule> {
    return this.http.get<UserModule>(`http://localhost:8081/api/getuserfromtoken`, { withCredentials: true });
  }




  logoutUser(): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/api/signout`, { withCredentials: true });
  }

  logoutAndRedirect(): void {
    this.logoutUser().subscribe(response => {
      console.log('Logout successful!', response);
      this.clearJwtCookie();
      this.router.navigate(['/login']); // Redirect to login page
    }, error => {
      console.error('Logout failed!', error);
    });
  }

  // Function to clear JWT cookie
  private clearJwtCookie(): void {
    document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
