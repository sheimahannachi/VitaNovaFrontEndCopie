import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }


  private baseUrl: string = 'http://localhost:8081/api/sendEmail';



  sendVerificationCode(email:string,subject:string,code:string) {
   
    // Make HTTP POST request to your backend endpoint
    const payload = { to: email, subject,text: code };

    this.http.post(this.baseUrl, payload).subscribe(
      (response) => {
        console.log('Verification code sent successfully');
        // Handle success (e.g., show a success message to the user)
      },
      (error) => {
        console.error('Error sending verification code:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
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

  
}
