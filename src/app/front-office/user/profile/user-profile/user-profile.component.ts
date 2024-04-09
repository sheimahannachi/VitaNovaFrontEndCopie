import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserModule } from 'src/app/Models/user.module';
import { AuthService } from 'src/app/Service/auth.service';
import { MiscService } from 'src/app/Service/misc.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userProfile: UserModule;
  editMode: boolean = false;
  editMode2: boolean = false;
  newPassword:string="";
  confirmPassword:string="";
  editField: string = ''; // Tracks which field is being edited
  profilePictureUrl:string="";
  constructor(private authService: AuthService,private userService:UserService,private http: HttpClient,private miscservice:MiscService) {
    this.userProfile = new UserModule(); // Initialize userProfile here
   
    
   }

  ngOnInit(): void {
    this.getUserInfoFromToken();
    
  }



  getUserInfoFromToken(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
        this.userProfile = response;
        console.log(this.userProfile.picture)
      },
      error => {
        console.error('Error fetching user information:', error);
      }
    );
    
  }




  toggleEditMode(): void {
   console.log("Session name : " , sessionStorage.getItem("username"))
    this.editMode = !this.editMode;
}



cancelEdit(): void {
  this.editMode = !this.editMode;

}

saveEdits(){
  this.editMode=false;
this.userService.updateUser(this.userProfile).subscribe();

}


toggleEditMode2(field: string): void {
  this.editMode2 = true;
  this.editField = field;
}

saveEdits2(): void {
  if (this.editField === 'password') {
    // Check if passwords match
    if (this.newPassword === this.confirmPassword) {
      // Update password logic here
      console.log('New password:', this.newPassword);
      console.log('Confirmed password:', this.confirmPassword);
      // Reset password fields
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      // Display error message or handle mismatched passwords
      console.error('Passwords do not match');
    }
  } else if (this.editField === 'email') {
    // Update email logic here
    console.log('New email:', this.userProfile.email);
  }
  // Reset edit mode and edit field
  this.editMode2 = false;
  this.editField = '';
}

cancelEdit2(): void {
  // Reset password fields if canceled
  this.newPassword = '';
  this.confirmPassword = '';
  // Reset edit mode and edit field
  this.editMode2 = false;
  this.editField = '';
}




save2(){
  if(this.newPassword==this.confirmPassword){
  this.userService.resetPassword(this.userProfile.email,this.newPassword,"").subscribe(response => {alert("password changed");
this.editMode2=false;
}, error => {
   
    console.error('error', error);
  });


}}





}


