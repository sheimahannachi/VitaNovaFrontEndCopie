import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import{UserModule} from '../Models/user.module'
import { ResetPasswordRequest } from '../front-office/user/login/UserInfoResponse';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseAdminUrl: string = 'http://localhost:8081/api/user/admin';
  private baseUrl: string ='http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModule[]> {
    return this.http.get<UserModule[]>(`${this.baseAdminUrl}/AllUsers`);

  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAdminUrl}/DeleteUser/${id}`);
  }
  ActivateUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAdminUrl}/ActivateUser/${id}`);
  }
  updateUser(user: UserModule): Observable<UserModule> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)
    return this.http.put<UserModule>(`${this.baseAdminUrl}/UpdateUser`, user, { headers, withCredentials: true })
      .pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          // You can handle error here, such as showing an error message
          return throwError(error);
        })
      );
  }
  
  resetPassword(email:string,password:string,phone:string): Observable<void>{
    let payload = {
      email,
      password,
      phone
    }
    console.log(payload);
        return this.http.put<void>(`http://localhost:8081/api/resetPassword`,payload);
    
  }
  resetPasswordPhone(phone:string,password:string): Observable<void>{
    let payload = {
      phone,
      password
    }
        return this.http.put<void>(`${this.baseUrl}/reset-password-Phone`,payload);
    
  }
  

  checkUsername(username: string) {
    return this.http.get<boolean>(`${this.baseUrl}/checkUsername?username=${username}`);
  }
  
  checkEmail(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/checkEmail?email=${email}`);
  }
  

  getUserByUsername(username: string): Observable<UserModule> {
    return this.http.get<UserModule>(`${this.baseUrl}/user/GetUserByUsername?username=${username}`);
  }

}
