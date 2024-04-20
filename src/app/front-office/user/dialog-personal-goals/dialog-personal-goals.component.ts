import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from './../../../Service/user.service';

@Component({
  selector: 'app-dialog-personal-goals',
  templateUrl: './dialog-personal-goals.component.html',
  styleUrls: ['./dialog-personal-goals.component.css']
})
export class DialogPersonalGoalsComponent {
  step: number = 1;
IdealWeight!:number;
useIdealWeight: boolean = true; // Variable to track whether to use ideal weight or not
numberOfWeeks:number;
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
      this.step++; 
     this.calculateIdealWeight();
    }, error => {
      console.error('Error updating user:', error);
    });
  }

  




perfectWeight(){

  
}


calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100; // Convert height from centimeters to meters
  let bmi: number;

  if (this.data.userProfile.gender === 'MAN') {
    bmi = weightKg / (heightM * heightM);
  } else if (this.data.userProfile.gender  === 'WOMAN') {
    bmi = weightKg / (heightM * heightM) * 0.9; // Adjusted BMI for women
  } else {
    throw new Error('Invalid gender specified.');
  }

  return parseFloat(bmi.toFixed(1)); // Round BMI to 1 decimal place and convert back to number
}

 interpretBMI(bmi: number): string {
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}


 calculateIdealWeightForMen(heightInCm: number): number {
  return 50 + 0.9 * (heightInCm - 152);
}

 calculateIdealWeightForWomen(heightInCm: number): number {
  return 45.5 + 0.9 * (heightInCm - 152);
}




toggleWeightInput(useIdealWeight: boolean) {
  this.useIdealWeight = useIdealWeight;

  if (!useIdealWeight) {
    // Reset ideal weight when user chooses to enter their own weight
    this.IdealWeight = undefined;
  } else {
    // Calculate and set the ideal weight based on gender and height
    this.calculateIdealWeight();
  }
}



calculateIdealWeight() {
  if (this.data.userProfile.gender === 'MAN') {
    this.IdealWeight = this.calculateIdealWeightForMen(this.data.userProfile.height);
  } else if (this.data.userProfile.gender === 'WOMAN') {
    this.IdealWeight = this.calculateIdealWeightForWomen(this.data.userProfile.height);
  } else {
    throw new Error('Invalid gender specified.');
  }
}

}
