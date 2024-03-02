import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // The URL of the login endpoint
  private loginUrl = 'http://localhost:8081/api/login';

  constructor(private http: HttpClient) { }

  // The method that sends the login request with the user credentials
  login(username: string, password: string) {
    // Create the request body with the username and password
    const requestBody = {
      username: username,
      password: password
    };

    // Send the request and return the response
    return this.http.post(this.loginUrl, requestBody, { observe: 'response', withCredentials: true });
  }
}
