import {Component, Input, OnInit} from '@angular/core';
import { Food } from '../Models/Foods';
import {FoodService} from "../Service/food.service";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsDialogComponent } from '../food-details-dialog/food-details-dialog.component';

@Component({
    selector: 'app-food-card',
    templateUrl: './food-card.component.html',
    styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {
    foods: Food[] = [];
    baseUrl: string = 'http://localhost:80/uploads/';
    showDetailsMap: { [key: number]: boolean } = {};
    filteredFoods: Food[] = [];
    searchTitle: string = '';
    searchCategory: string = '';
    searchNutritionalValue: string = '';
    selectedCategories: string[] = [];
    fruitsSelected: boolean = false;
    vegetablesSelected: boolean = false;
    MeatSelected: boolean = false;
    DairySelected: boolean = false;
    PlantsSelected: boolean = false;

    minCalories: number = 0;
    maxCalories: number = 500;
    ngOnInit() {
        this.getFoods(1,10);
    }

    constructor(private foodService: FoodService,private router: Router,public dialog: MatDialog) {
        this.selectedCategories = [];
    }
  openFoodDetailsDialog(food: Food): void {
    const dialogRef = this.dialog.open(FoodDetailsDialogComponent, {
      data: food
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
    updateSelectedCategories(category: string, isChecked: boolean): void {
        if (isChecked) {
            // Add the category to the array if checked
            this.selectedCategories.push(category);
        } else {
            // Remove the category from the array if unchecked
            const index = this.selectedCategories.indexOf(category);
            if (index !== -1) {
                this.selectedCategories.splice(index, 1);
            }
        }
    }



    retrieveFoodByCaloriesRange(): void {
        this.filteredFoods = this.foods.filter(food => {
            return food.calories >= this.minCalories && food.calories <= this.maxCalories;
        });
    }

    filter(){
        console.log(this.minCalories);
        console.log(this.maxCalories);
        console.log(this.selectedCategories);

        this.retrieveFoodByCaloriesRange();
        if (this.selectedCategories.length > 0) {
            this.filteredFoods = this.filteredFoods.filter(food => {
                // Check if the food's category is included in the selectedCategories array
                return this.selectedCategories.includes(food.category);
            });
        }

    }

    getFoods(page:number,size:number): void {
        this.foodService.getFoods(page,size).subscribe(foods => {
            this.foods = foods;
            this.filteredFoods = [...this.foods]; // Initialize filteredFoods with all foods
            /*this.applyFilters(); // Apply filters initially*/
            this.foods.forEach(foods => {
                foods.foodPic = this.baseUrl + foods.foodPic;
            });
        });
    }
    toggleDetails(foodId: number): void {
        this.showDetailsMap[foodId] = !this.showDetailsMap[foodId];
    }

    isDetailsVisible(foodId: number): boolean {
        return this.showDetailsMap[foodId] || false;
    }
  applyFilters(): void {
    this.filteredFoods = this.foods.filter(food => {
      // Filter by title
      return food.title.toLowerCase().includes(this.searchTitle.toLowerCase());
    });
  }






}
