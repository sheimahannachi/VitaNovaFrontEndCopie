import { HttpClient } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component ,NgZone} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string ="";
  firstName: string ="";
  lastName: string ="";
  dateOfBirth!: Date;
  email: string ="";
  password: string ="";
  role: string="";
  picture: string ="";
  gender:string="";
  weight:number=0;
  passwordTEST:boolean=false;
  height:number=0;
  strengthText: string = '';
  selectedFile: File | null = null;
  showVerificationCodeInput: boolean = false;
  verificationCode!: string;
  generatedCode!: string;
  show_verification:boolean=false;
verified:boolean=false;
textColor: string = '';
EmailExists:boolean=false;
UsernameExists:boolean=false;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer,private fb: FormBuilder,private zone: NgZone,private userService : UserService) {


  }
 

  save()
  {
    
    if (this.validateFields() && this.validateEmail(this.email) ) {

    let bodyData = {
      "username" : this.username,
      "email" : this.email,
      "password" : this.password,
      "role": this.role,
      "picture":this.picture,
      "gender":this.gender,
      "height":this.height,
      "weight":this.weight,
      "dateOfBirth":this.dateOfBirth,
      "firstName":this.firstName,
      "lastName":this.lastName,
      "verified":this.verified
    };
    
    if(this.verified==true){
    this.http.post("http://localhost:8081/api/signup",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {

        console.log(bodyData);
        alert(" Registered Successfully");

    });
  }
  }}

 verifyEmail() {
    if (this.verificationCode === this.generatedCode) {
      // If the codes match, set verified to true
      this.verified = true;
      console.log('Email verified successfully');
    } else {
      console.log('Verification code does not match');
    }
    console.log(this.verificationCode);
    console.log(this.generateVerificationCode);

  }


checkEmail(){
  this.userService.checkEmail(this.email).subscribe((exists: boolean) => {
    if (exists) {
      this.EmailExists=true;
      console.log('Email already exists');
      // Handle existing email scenario
    } else {
      this.EmailExists=false;
      console.log('Email available');
      // Handle available email scenario
    }
  });
  
}

  sendVerificationCode() {
    this.checkEmail();
    console.log(this.EmailExists)
    if(!this.EmailExists){
    this.generatedCode=this.generateVerificationCode();
this.showVerificationCodeInput=true;
    // Make HTTP POST request to your backend endpoint
    const apiUrl = 'http://localhost:8081/api/sendEmail';
    const payload = { to: this.email, subject:"verification",text: this.generatedCode };

    this.http.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Verification code sent successfully');
        // Handle success (e.g., show a success message to the user)
      },
      (error) => {
        console.error('Error sending verification code:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );}
    else{this.EmailExists=true;}
  }

  


  onPasswordChange(): void {
    // Call a function to calculate password strength
    const strength = this.calculatePasswordStrength(this.password);

    // Update the text and text color based on password strength
    if (strength < 3) {
      this.strengthText = 'Weak';
      this.textColor = 'red';
    } else if (strength < 5) {
      this.strengthText = 'Moderate';
      this.textColor = 'black';
    } else {
      this.strengthText = 'Strong';
      this.textColor = 'green';
    }
  }

  calculatePasswordStrength(password: string): number {
    // Implement your logic to calculate password strength
    let strength = 0;
    // Example criteria: length, presence of uppercase letters, lowercase letters, numbers, and special characters
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (length >= 8) {
      strength++;
    }
    if (hasUpperCase) {
      strength++;
    }
    if (hasLowerCase) {
      strength++;
    }
    if (hasNumber) {
      strength++;
    }
    if (hasSpecialChar) {
      strength++;
    }

    return strength;
  }










  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }


getSelectedFileUrl(): SafeUrl | null {
    if (this.selectedFile) {
      const url = window.URL.createObjectURL(this.selectedFile);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      return null;
    }
  }


  generateVerificationCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let verificationCode = '';
    for (let i = 0; i < 6; i++) {
      verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return verificationCode;
  }
  


  validateFields(): boolean {
    

    const areAllFieldsValid = (
        this.firstName &&
        this.lastName &&
        this.username &&
        this.email &&
        this.password &&
        this.role &&
        this.gender &&
        this.dateOfBirth &&
        this.weight &&
        this.height
    );

    if (areAllFieldsValid)return true;
    else return false;
}

  validateEmail(email: string): boolean {
    // Add your email validation logic here.
    // You can use a regular expression to check if the email is valid.
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  validatePassword(password: string): boolean {
    // Add your password validation logic here.
    // You can check if the password meets certain requirements, such as a minimum length or the presence of special characters.
    return password.length >= 8;
  }

  
  
}
