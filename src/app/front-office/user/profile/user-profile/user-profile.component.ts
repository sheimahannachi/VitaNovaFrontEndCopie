import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/Models/user.module';
import { AuthService } from 'src/app/Service/auth.service';
import { UserService } from 'src/app/Service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPersonalGoalsComponent } from '../../dialog-personal-goals/dialog-personal-goals.component';
import { Plan } from 'src/app/Models/user.module';
import { DialogPlanComponent } from '../../dialog-plan/dialog-plan.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserModule;
  editMode: boolean = false;
  editMode2: boolean = false;
  newPassword: string = "";
  confirmPassword: string = "";
  editField: string = ''; // Tracks which field is being edited
  profilePictureUrl: string = "";

  constructor(private dialog: MatDialog,private authService: AuthService, private userService: UserService, private http: HttpClient) {
    this.userProfile = new UserModule(); // Initialize userProfile here
  }

  ngOnInit(): void {
    this.getUserInfoFromToken();
  }

  getUserInfoFromToken(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
        this.userProfile = response;
      },
      error => {
        console.error('Error fetching user information:', error);
      }
    );
  }

  toggleEditMode(): void {
    console.log("Session name : ", sessionStorage.getItem("username"))
    this.editMode = !this.editMode;
  }

  cancelEdit(): void {
    this.editMode = !this.editMode;
  }

  saveEdits(): void {
    this.editMode = false;
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

  save2(): void {
    if (this.newPassword == this.confirmPassword) {
      this.userService.resetPassword(this.userProfile.email, this.newPassword, "").subscribe(response => {
        alert("password changed");
        this.editMode2 = false;
      }, error => {
        console.error('error', error);
      });
    }
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogPersonalGoalsComponent, {
      width: '400px', 
      height:'388px',
      data: { userProfile: this.userProfile } 

    });
  
    // Handle the dialog result if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      // Add any further processing here if needed
    });
  }


  openDialogPlan() {
    const dialogRef = this.dialog.open(DialogPlanComponent, {
      width: '800px', 
      height:'315px',
      data: { userProfile: this.userProfile } 

    });
  
    // Handle the dialog result if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      // Add any further processing here if needed
    });
  }
}
