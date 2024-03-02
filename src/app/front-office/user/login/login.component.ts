import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // The error message
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  // The method that handles the form submission
  onSubmit(username: string, password: string) {
    // Call the service method and subscribe to the response
    this.authService.login(username, password).subscribe({
      next: (data: HttpResponse<Object>) => {
        // If the login is successful, navigate to the home component
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        // If the login fails, display an error message
        this.errorMessage = 'Invalid username or password';
      }
    });
    
   
  }
}
