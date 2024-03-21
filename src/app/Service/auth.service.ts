import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

  constructor(private http: HttpClient,private cookieService: CookieService,private router: Router) {

   }

  authenticateAndGetToken(authRequest: LoginRequest): Observable<UserInfoResponse> {
    return this.http.post<UserInfoResponse>(`${this.baseUrl}/generateToken`, authRequest);
  }

  setJwtCookie(jwt: string): void {
    this.cookieService.set('jwtToken', jwt);
  }

  getUserInfoFromToken(): Observable<UserModule> {
    return this.http.get<UserModule>(`${this.baseUrl}/getuserfromtoken`, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error fetching user info from token:', error);
        alert("Session expired ");
        // Clear JWT cookie and redirect to login
        this.clearJwtCookie();
        this.router.navigate(['/login']);
        return throwError(error);
      })
    );
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

  checkJwtCookieValidityAndRedirect(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      const jwtPayload = this.parseJwt(jwtToken);
      if (jwtPayload) {
        const expirationTime = jwtPayload.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = new Date().getTime();
        if (expirationTime < currentTime) {
          // JWT token has expired
          console.log('JWT token expired. Clearing cookie and redirecting to login.');
          this.clearJwtCookie();
          this.router.navigate(['/login']);
        }
      }
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }
}
