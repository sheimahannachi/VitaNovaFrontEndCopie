import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  weightGoal:number=0;
daysleft!:number;
startDate!:Date;
  constructor(private dialog: MatDialog,private authService: AuthService, private userService: UserService, private http: HttpClient) {
    this.userProfile = new UserModule(); 
  }

  ngOnInit(): void {
    this.getUserInfoFromToken();

  }

  getUserInfoFromToken(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
        this.userProfile = response;
        if(this.userProfile.personalGoals!=null){
this.weightGoal=this.userProfile.personalGoals.weightGoal}
this.profilePictureUrl=this.userProfile.picture
this.startDate=this.userProfile.personalGoals.startDate;
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
      data: { userProfile: this.userProfile }, 
      disableClose: true 

    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.achievementUnlocked("You Started the Journey! + 1 VCoin");

      if(this.userProfile.personalGoals!=null){
        this.userProfile.score++;
        this.userService.updateUser(this.userProfile).subscribe(
          
        );

      }
      console.log('Dialog closed with result:', result);
    });
  }


  openDialogPlan() {
    const dialogRef = this.dialog.open(DialogPlanComponent, {
      width: '800px', 
      height:'315px',
      data: { userProfile: this.userProfile } 

    });
   
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
         });
  }


  @ViewChild('achievementBox') achievementBox: ElementRef;

  achievementUnlocked(text: string) {
    const hasClass = this.achievementBox.nativeElement.classList.contains('achieved');
    if (hasClass) return;

    this.achievementBox.nativeElement.querySelector('.title').textContent = "Achievement unlocked!";
    this.achievementBox.nativeElement.querySelector('.detail').textContent = text;
    this.achievementBox.nativeElement.classList.add("achieved");
    setTimeout(() => {
      this.achievementBox.nativeElement.classList.remove("achieved");
    }, 5000);
  }

  calculateWidth(): number {
    if (this.weightGoal !== 0 && this.userProfile.personalGoals.weightStart !== 0) {
      this.daysleft=this.calculateDaysLeft();
      const weightDifference = Math.abs(this.userProfile.personalGoals.weightStart - this.weightGoal);
      const currentWeightDifference =Math.abs( this.userProfile.personalGoals.weightStart - this.userProfile.weight);
     

      const progressPercentage = (currentWeightDifference / weightDifference) * 100;
      return Math.max(0, Math.min(100, progressPercentage));
    } else {
      return 0;
    }
  }

calculateDaysLeft(): number {
  if (this.userProfile.personalGoals.startDate && this.userProfile.personalGoals.dateGoal) {
    const startDate = new Date(this.userProfile.personalGoals.startDate);
    const dateGoal = new Date(this.userProfile.personalGoals.dateGoal);
    
    const differenceInMilliseconds = dateGoal.getTime() - startDate.getTime();
    
    
    const daysLeft = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
    return daysLeft;
  } else {
    return 0;
  }
}

  



}
