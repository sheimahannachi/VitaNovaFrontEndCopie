import { HttpResponse } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from './LoginRequest';
import { AuthService } from 'src/app/Service/auth.service';
import { EmailService } from './../../../Service/email.service';
import { UserService } from 'src/app/Service/user.service';
import { SMSService } from './../../../Service/sms.service';
import { OpenCvService } from 'src/app/Service/open-cv.service';
import { UserModule } from 'src/app/Models/user.module';

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
  isButtonDisabled: boolean = false;
  countdown: number = 30;
 loginAttempt=true;
loginAttempts:number=0;
  constructor( private OpencvService:OpenCvService, private authService: AuthService,private router: Router,private emailService:EmailService,private userService:UserService, private smsService:SMSService) { }
  
  @HostListener('window:beforeunload', ['$event']) beforeUnloadHander($event: any) { 
    if (this.showResetPasswordForm) 
    { $event.returnValue = 'You will lose your progress. Are you sure you want to leave this page?'; } 
  }
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any): void {
    if (this.showResetPasswordForm ) {
      if (!confirm('You will lose your progress. Are you sure you want to leave this page?')) {
        history.pushState(null, document.title, window.location.href);
        event.preventDefault();
      }
    }
  }
  
  
  
  
  
  
  
  
  
  
  getButtonLabel() {
    return this.showResetPasswordForm ? "Password Reset" : "Login";
}
  // The method that handles the form submission
  onSubmit(): void {
      this.authService.authenticateAndGetToken(this.authRequest)
      .subscribe(response => {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username",response.username);
        sessionStorage.setItem("email",response.email);
        sessionStorage.setItem("role",response.role);
        sessionStorage.setItem("token",response.token);
        sessionStorage.setItem("role",JSON.stringify(response.role));
        console.log('Login successful!', response);
        this.authService.setJwtCookie(response.token);
        if(response.role=='USER')
        this.router.navigate(['/profile']); 
      else if(response.role=="ADMIN")
      this.router.navigate(['/admin/users']); 
      
      }, error => {  
        this.userService.getUserByUsername(this.authRequest.username)
        .subscribe(
          (user: UserModule) => {
            console.log("User details: ", user);
            if(this.loginAttempts>2){this.OpencvService.captureAndSaveImage().subscribe(
              () => {
                this.emailService.sendLoginImage(user.email,"LOGIN ALERT","Someone tried to login to your account , if it's not you , please consider resetting your password","")

                console.log('Image captured and saved successfully');
                
              },
              error => {
                console.error('Error occurred while capturing and saving image:', error);
              }
            );
            console.log("username : " , this.authRequest.username)
            
    
         // this.emailService.sendLoginImage()
          }
          },
          (error) => {
            console.error("Error fetching user details: ", error);
          }
        ); 
       
        this.loginAttempt=false;
        this.loginAttempts=this.loginAttempts+1;
console.log(this.loginAttempts);
        console.error('Login failed!', error);
      });
  }
  sendVerificationCode() {
    this.isButtonDisabled = true;

    this.startCountdown();
    if(this.resetMethod==='email'){
      this.emailService.sendVerificationCode(this.email,"Password Reset ",this.generatedCode);
    }
    if(this.resetMethod==='phone'){
      this.smsService.sendSMS(this.phoneNumber,this.generatedCode);
    }
  }
  
  verifyCode(){
if(this.generatedCode==this.verificationCode){
  this.verified=true;
}
  }


  savePassword(){
    if(this.newPassword==this.confirmPassword){
      if(this.resetMethod==='email'){
    this.userService.resetPassword(this.email,this.newPassword,"").subscribe(response => {alert("password changed");
    location.reload();
  }, error => {
     
      console.error('error', error);
    });


  }}
  else if(this.resetMethod==='phone'){
    this.userService.resetPasswordPhone(this.phoneNumber,this.newPassword).subscribe(response => {alert("password changed");
    location.reload();
  }, error => {
     
      console.error('error', error);
    });


  }}
  startCountdown() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.countdown = 30;
        this.isButtonDisabled = false;
      }
    }, 1000);
  }
  
  goback() {
    this.showResetPasswordForm=false;  }

}
