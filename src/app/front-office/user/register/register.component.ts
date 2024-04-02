import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component ,HostListener,NgZone} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { UserService } from 'src/app/Service/user.service';
import { RecaptchaModule,ReCaptchaV3Service } from 'ng-recaptcha';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string ="";
  firstName: string ="";
  lastName: string ="";
  dateOfBirth: Date=new Date();
  email: string ="";
  password: string ="";
  role: string="";
  picture: string ="";
  gender:string="";
  weight:number=0;
  phoneNumber:string="";
  height:number=0;
  selectedFile: File | null = null;
  showVerificationCodeInput: boolean = false;
  verificationCode!: string;
  generatedCode!: string;
  show_verification:boolean=false;
textColor: string = '';

selectedFileName!:string;
passwordConfirm!:string;
registerSection:number=0;



theme:string="dark";
image1:string="http://localhost/cats/giphy2.gif";
image2:string="http://localhost/cats/giphy2.gif";
image3:string="http://localhost/cats/giphy2.gif";

/*ERRORS*/
termsChecked:boolean=false;
phoneError:boolean=false;
emailError:boolean=false;
termsError:boolean=false;
EmailExists:boolean=false;
UsernameExists:boolean=false;
verified:boolean=false;
usernameError:boolean=false;
roleError:boolean=false;
genderError:boolean=false;
DateError:boolean=false;
strengthText: string = '';
captcha:string="";

resolved(captchaResponse:string){
  
  this.captcha=captchaResponse;
  console.log('resolved captcha ' + this.captcha);
  }


@HostListener('window:beforeunload', ['$event']) beforeUnloadHander($event: any) { 
  if (this.registerSection > 0) 
  { $event.returnValue = 'You will lose your progress. Are you sure you want to leave this page?'; } 
}

@HostListener('window:popstate', ['$event'])
onPopState(event: any): void {
  if (this.registerSection > 0) {
    if (!confirm('You will lose your progress. Are you sure you want to leave this page?')) {
      history.pushState(null, document.title, window.location.href);
      event.preventDefault();
    }
  }
}




  constructor(private recaptchaV3Service: ReCaptchaV3Service, private http: HttpClient, private sanitizer: DomSanitizer,private fb: FormBuilder,private zone: NgZone,private userService : UserService,private router:Router) {
    this.selectedFileName = this.selectedFile?.name ?? '';
    this.generatedCode=this.generateVerificationCode();
   
  
  }
  switchModes(){
  if(this.theme=="dark"){
    this.theme="light";
    this.image1="http://localhost/cats/cat2.gif";
    this.image2="http://localhost/cats/cat3.gif";
    this.image3="http://localhost/cats/cat5.gif";

}
  else {this.theme="dark";
  this.image1="http://localhost/cats/giphy2.gif";
  this.image2="http://localhost/cats/giphy2.gif";
  this.image3="http://localhost/cats/giphy2.gif";

}
  console.log(this.theme);
 }

 ValidateAll() {

  if (this.phoneNumber.length !== 8 || !/^\d+$/.test(this.phoneNumber)) {
    this.phoneError = true;
  } else {
    this.phoneError = false;
  }
  if(this.role==""){this.roleError=true ; }else this.roleError=false;
  if(this.gender==""){this.genderError=true;}else this.genderError=false;

  // Parse the date of birth string into a Date object
  const dateOfBirth = new Date(this.dateOfBirth);

  // Calculate the date 13 years ago from today
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);


  // Compare the year, month, and day components of the dates
  if (dateOfBirth.getFullYear() > thirteenYearsAgo.getFullYear() ||
      (dateOfBirth.getFullYear() === thirteenYearsAgo.getFullYear() && dateOfBirth.getMonth() > thirteenYearsAgo.getMonth()) ||
      (dateOfBirth.getFullYear() === thirteenYearsAgo.getFullYear() && dateOfBirth.getMonth() === thirteenYearsAgo.getMonth() && dateOfBirth.getDate() > thirteenYearsAgo.getDate())) {
    this.DateError = true;
  } else {
    this.DateError = false;
  }
  
}

  save()
  {
    console.log("save")
   

    

    
    this.ValidateAll()
    console.log("verified " , this.verified)
    console.log("this.validateFields() " , this.validateFields())
    console.log(" lkol " , this.validateEmail(this.email)&&this.DateError==false&&this.genderError==false&&this.roleError==false&&this.phoneError==false)

   
    if (this.validateFields() && this.validateEmail(this.email) && !this.DateError && !this.genderError && !this.roleError && !this.phoneError) {
      // Check if a file is selected
      if (this.selectedFile) {
        // Create FormData object
        const formData = new FormData();
        this.copyFileToFTP();
        // Append form fields
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('role', this.role);
        formData.append('gender', this.gender);
        formData.append('height', String(this.height));
        formData.append('weight', String(this.weight));
        
        // Convert date to ISO string
        const isoDate = new Date(this.dateOfBirth).toISOString();
        formData.append('dateOfBirth', isoDate); 
    console.log(isoDate)
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('verified', String(this.verified));
        formData.append('phone', this.phoneNumber);
        
        // Append the selected file
        formData.append('picture', this.selectedFileName); // Include file name
        
        // Send HTTP POST request
        this.http.post("http://localhost:8081/api/signup", formData).subscribe(
          (resultData: any) => {
            console.log(resultData);
            alert("Registered Successfully");
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error registering user:', error);
            // Handle error if needed
          }
        );
      } else {
        console.error('No file selected.');
        // Handle case where no file is selected
      }
    }}

 verifyEmail() {
    if (this.verificationCode === this.generatedCode) {
      // If the codes match, set verified to true
      this.verified = true;
      console.log('Email verified successfully');
    } else {
      this.verified = false;
      console.log('Verification code does not match');

    }


  }


checkEmail(){
  this.userService.checkEmail(this.email).subscribe((exists: boolean) => {
    if (exists) {
      this.EmailExists=true;
    } else {
      this.EmailExists=false;
    }
  });
  
}
checkUsername(){
  this.userService.checkUsername(this.username).subscribe((exists: boolean) => {
    if (exists) {
      this.UsernameExists=true;
    } else {
      this.UsernameExists=false;
    }
  });
  
}

timerSeconds = 0;


  sendVerificationCode() {
    this.checkEmail();
    this.generatedCode=this.generateVerificationCode();
// Start the timer

    if(!this.EmailExists&&this.validateEmail(this.email)){
      this.emailError=false;
this.showVerificationCodeInput=true;
    // Make HTTP POST request to your backend endpoint
    const apiUrl = 'http://localhost:8081/api/sendEmail';
    const payload = { to: this.email, subject:"verification",text: this.generatedCode };
    this.timerSeconds = 30;
    this.startTimer();

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

  startTimer() {
    const timer = setInterval(() => {
      this.timerSeconds--;
  
      if (this.timerSeconds <= 0) {
        clearInterval(timer);
      }
    }, 1000);
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
  this.textColor='turquoise'
    
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
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.selectedFileName=this.selectedFile.name;
    }
    console.log(this.selectedFile)
  }

  
  getImageUrl(file: File | null): string {
    if (file) {
      return URL.createObjectURL(file);
    } else {
      return ''; // 
    }
  }
  
  getSelectedFileName(): string | null {
    if (this.selectedFile) {
      return this.selectedFile.name;
    } else {
      return null;
    }
  }
  /*copyFileToXAMPP(): void {
    if (this.selectedFile) {
      console.log("in copyfiletoxamp function " + this.selectedFile);
  
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      this.http.post<any>(`http://localhost:8081/api/misc/copyToXampp`, formData).pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError('Failed to upload file'); // Return a custom error message
        })
      ).subscribe(response => {
        console.log('File uploaded successfully:', response);
        // Handle success if needed
      }, error => {
        console.error('Error uploading file:', error);
        // Handle error if needed
      });
    } else {
      console.log("empty file");
    }
  }*/



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
        this.dateOfBirth 
    );

    if ((areAllFieldsValid))return true;
    else return false;
}

  validateEmail(email: string): boolean {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())==true){this.emailError=false; return true;}
    else this.emailError=true;return false ;
  }
  
  validatePassword(password: string): boolean {
    // Add your password validation logic here.
    // You can check if the password meets certain requirements, such as a minimum length or the presence of special characters.
    return password.length >= 8;
  }
  validateUsername() {
    if (this.username && /^[^0-9].*$/.test(this.username.trim())) {
      this.usernameError=false;

      return true;
    } else {
      this.usernameError=true;
      return false;
    }
  }
  

onTermsChange(checked: boolean) {
  this.termsChecked = checked;
}
 next1(){
 this.checkEmail();
this.checkUsername();
this.validateUsername();

if((this.validateEmail(this.email))&&(this.EmailExists==false)&&(this.UsernameExists==false)&&this.verified&&this.termsChecked)this.registerSection=this.registerSection+1;
else
if((this.validateEmail(this.email))&&(this.EmailExists==false)&&(this.UsernameExists==false)&&!this.verified) alert("Email verification is required");
if((this.validateEmail(this.email))&&(this.EmailExists==false)&&(this.UsernameExists==false)&&this.verified&&!this.termsChecked){this.termsError=true;}else this.termsError=false;
}
  

next2(){
 
if(this.firstName!=null&&this.lastName!=null&&this.password!=null&&this.password==this.passwordConfirm&&(this.strengthText=="Moderate"||this.strengthText=="Strong"))this.registerSection=this.registerSection+1;
}



copyFileToFTP(): void {
  if (this.selectedFile) {
    console.log("in copyfiletoFTP function " + this.selectedFile);

    const newFileName = uuidv4() + '.jpg'; 
    console.log("New filename:", newFileName);
this.selectedFileName=newFileName;
    // Create a new File object with the selected file and the new filename
    const renamedFile = new File([this.selectedFile], newFileName, { type: this.selectedFile.type });

    const formData = new FormData();
    formData.append('file', renamedFile);

    this.http.post<any>(`http://localhost:8081/api/misc/copyToFTP`, formData).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Failed to upload file'); // Return a custom error message
      })
    ).subscribe(response => {
      console.log('File uploaded successfully:', response);
      // Handle success if needed
    }, error => {
      console.error('Error uploading file:', error);
      // Handle error if needed
    });
  } else {
    console.log("empty file");
  }
}
}




