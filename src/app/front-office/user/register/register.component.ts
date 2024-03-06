import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
  height:number=0;


  constructor(private http: HttpClient )
  {

  }
  save()
  {
  
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
      "lastName":this.lastName
    };
    this.http.post("http://localhost:8081/api/signup",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert(" Registered Successfully");

    });
  }

}