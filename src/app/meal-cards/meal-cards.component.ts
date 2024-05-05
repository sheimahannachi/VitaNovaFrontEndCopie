import { Component, OnInit } from '@angular/core';
import { FoodService } from '../Service/food.service';
import { Router } from '@angular/router';
import { MealType } from '../models/MealType';
import { FoodCard } from '../Models/FoodCard';
import {Tracker} from "../models/Tracker";

@Component({
  selector: 'app-meal-cards',
  templateUrl: './meal-cards.component.html',
  styleUrls: ['./meal-cards.component.css']
})
export class MealCardsComponent implements OnInit {
  breakfastFoodCards: FoodCard[] = [];
  lunchFoodCards: FoodCard[] = [];
  dinnerFoodCards: FoodCard[] = [];
  snacksFoodCards: FoodCard[] = [];
  mealtype: MealType;
  idtracker: number;
  waterConsumed: number = 0;
  isFilled: boolean[] = [false, false, false, false];

  constructor(private foodService: FoodService, private router: Router) {
  }

  ngOnInit(): void {

  }



  addFoodToMeal(mealType: MealType): void {
    // Navigate to the food front component with the meal type as a parameter
    this.router.navigate(['vitaNova/foodFront'], {queryParams: {mealType: mealType}});
  }

  protected readonly MealType = MealType;




  addWater(amount: number, index: number) {
    this.isFilled[index] = true;
    this.waterConsumed += amount;
  }
}

