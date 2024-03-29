import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from './LoginRequest';
import { AuthService } from 'src/app/Service/auth.service';
import { EmailService } from './../../../Service/email.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest: LoginRequest = {
    username: '',
    password: ''
  };
  // The error message
  errorMessage!: string;
  verificationCode: string = '';
  generatedCode:string = this.emailService.generateVerificationCode();
  showResetPasswordForm: boolean = false;
  verified:boolean=false;
  email: string = "";
  resetMethod :string="email";
  phoneNumber : string ="";
  newPassword!: string;
  confirmPassword !: string;
  constructor( private authService: AuthService,private router: Router,private emailService:EmailService,private userService:UserService) { }
  getButtonLabel() {
    return this.showResetPasswordForm ? "Password Reset" : "Login";
}
  // The method that handles the form submission
  onSubmit(): void {
    this.authService.authenticateAndGetToken(this.authRequest)
      .subscribe(response => {
        console.log('Login successful!', response);
        this.authService.setJwtCookie(response.token);
        this.router.navigate(['/profile']); 


      }, error => {
        // Handle login error here
        console.error('Login failed!', error);
      });
  }

  sendVerificationCode() {
    if(this.resetMethod==='email'){
      this.emailService.sendVerificationCode(this.email,"Password Reset ",this.generatedCode);
    }
  }
  verifyCode(){
if(this.generatedCode==this.verificationCode){
  this.verified=true;
}
  }


  savePassword(){
    if(this.newPassword==this.confirmPassword){
    this.userService.resetPassword(this.email,this.newPassword);
  alert("password changed");
  this.router.navigate(['/profile']); 

  }
  }
  
}
