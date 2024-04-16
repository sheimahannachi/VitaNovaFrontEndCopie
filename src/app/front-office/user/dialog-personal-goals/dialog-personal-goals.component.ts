import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../../Service/user.service';

@Component({
  selector: 'app-dialog-personal-goals',
  templateUrl: './dialog-personal-goals.component.html',
  styleUrls: ['./dialog-personal-goals.component.css']
})
export class DialogPersonalGoalsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  UpdateUser() {
    // Create a new object with updated weight and height
    const updatedUser = {
      ...this.data.userProfile,
      weight: this.data.userProfile.weight,
      height: this.data.userProfile.height
    };

    // Call the updateUser method to save the changes
    this.userService.updateUser(updatedUser).subscribe(updatedUser => {
      console.log('User updated successfully:', updatedUser);
      // You can handle success here, such as showing a success message
    }, error => {
      console.log(updatedUser)
      console.error('Error updating user:', error);
      // You can handle error here, such as showing an error message
    });
  }
}
