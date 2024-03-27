import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from '../models/food';

@Component({
  selector: 'app-food-details-dialog',
  templateUrl: './food-details-dialog.component.html',
  styleUrls: ['./food-details-dialog.component.css']
})
export class FoodDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FoodDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {

  }
}
