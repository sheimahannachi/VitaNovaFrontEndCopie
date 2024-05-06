import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Food } from '../Models/Foods';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { TrackerService } from '../Service/tracker.service';
import { FoodService } from '../Service/food.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MealType } from "../models/MealType";
import {UserModule} from "../Models/user.module";
import {AuthService} from "../Service/auth.service";

@Component({
  selector: 'app-food-details-dialog',
  templateUrl: './food-details-dialog.component.html',
  styleUrls: ['./food-details-dialog.component.css']
})
export class FoodDetailsDialogComponent {
  quantity!: number;
  mealType: MealType;
  foodForm: FormGroup;
  userId:UserModule

  constructor(
    public dialogRef: MatDialogRef<FoodDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { food: Food }, // Remove mealType from injected data
    private trackerService: TrackerService,
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.foodForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      mealType: ['', Validators.required],

    });

    // Retrieve mealType from URL parameters
    this.route.queryParams.subscribe(params => {
      this.mealType = params['mealType'];
    });
    this.authService.getUserInfoFromToken().subscribe(userId => {
      this.userId = userId;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFoodCards() {
    if (!this.data || !this.data.food || !this.data.food.id) {
      console.error('Food object or its id is undefined');
      return;
    }

    const foods: Food[] = [this.data.food];
    const quantity: number = this.quantity;
    const mealType: MealType = this.mealType;
    const calcCalories: number = this.data.food.calories * quantity;

    this.foodService.addFoodCards(foods, quantity,mealType,this.userId.idUser).subscribe(
      response => {
        console.log('Food cards added successfully:', response);
        console.log(mealType);
        this.router.navigate(['vitaNova/list-of-foods']);
      },
      error => {
        console.error('Error adding food cards:', error);
      }
    );
  }
}


