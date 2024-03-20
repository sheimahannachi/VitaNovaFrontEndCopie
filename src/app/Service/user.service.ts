import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{UserModule} from '../Models/user.module'
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
    return this.http.put<UserModule>(`${this.baseAdminUrl}/UpdateUser`, user);
  }
  resetPassword(email:string,password:string): Observable<void>{
    let payload = {
      email,
      password
    }
        return this.http.put<void>(`${this.baseUrl}/`,payload);
    
  }

  checkUsername(username: string) {
    return this.http.get<boolean>(`${this.baseUrl}/user/check-username?username=${username}`);
  }

  checkEmail(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}/user/check-email?email=${email}`);
  }




}
