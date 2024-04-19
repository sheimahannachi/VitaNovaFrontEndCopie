import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from '../models/food';
import { Router } from '@angular/router'; // Import Router
import { TrackerService } from "../services/tracker.service";
import { FoodService } from "../services/food.service";
import { Tracker } from "../models/Tracker";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-food-details-dialog',
    templateUrl: './food-details-dialog.component.html',
    styleUrls: ['./food-details-dialog.component.css']
})
export class FoodDetailsDialogComponent {
    quantity!: number;
    foodForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<FoodDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Food,
        private trackerService: TrackerService,
        private foodService: FoodService,
        private router: Router, // Inject Router
        private formBuilder: FormBuilder // Inject FormBuilder
    ) {
        // Initialize the foodForm with FormBuilder
      this.foodForm = this.formBuilder.group({
        quantity: ['', Validators.required] // Define quantity control with required validator
      });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    addFoodCards() {
        const foods: Food[] = [this.data]; // Wrap the single food item in an array
        const quantity: number = this.quantity;
      const calcCalories: number = this.data.calories * quantity;
        this.foodService.addFoodCards(foods, quantity).subscribe(
            response => {
                console.log('Food cards added successfully:', response);
                // Navigate to the component where you display the list of added foods
                this.router.navigate(['list-of-foods']);
            },
            error => {
                console.error('Error adding food cards:', error);
            }
        );
    }





}
