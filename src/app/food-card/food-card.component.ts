import {Component, Input, OnInit} from '@angular/core';
import { Food } from '../models/food';
import {FoodService} from "../services/food.service";
import {Router} from "@angular/router";
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
  // Déclaration des variables pour les filtres
  categories: string[] = ['Fruits', 'Vegetables', 'Meats', 'Dairy Products', 'Plants'];
  selectedCategories: { name: string, isSelected: boolean }[] = [];


  minCalories: number = 0;
  maxCalories: number = 500;
  ngOnInit() {
    this.getFoods();
  }

  constructor(private foodService: FoodService,private router: Router) {
    this.categories.forEach(category => {
      this.selectedCategories.push({ name: category, isSelected: false });
    });
  }

  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
      this.filteredFoods = [...this.foods]; // Initialize filteredFoods with all foods
      this.applyFilters(); // Apply filters initially
      this.foods.forEach(foods => {
        foods.foodPic = this.baseUrl + foods.foodPic;
      });
    });
  }
  toggleDetails(foodId: number): void {
    this.showDetailsMap[foodId] = !this.showDetailsMap[foodId];
  }
  goToDetails(id: number): void {
    this.router.navigate(['/foodDetails', id]);
  }

  isDetailsVisible(foodId: number): boolean {
    return this.showDetailsMap[foodId] || false;
  }
  applyFilters(): void {
    this.filteredFoods = this.foods.filter(food => {
      let titleMatch = true;
      let categoryMatch = true;
      let nutritionalValueMatch = true;

      // Filter by title
      if (this.searchTitle.trim() !== '') {
        titleMatch = food.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      }

      // Filter by category
      if (this.selectedCategories.some(cat => cat.isSelected)) {
        categoryMatch = this.selectedCategories.some(cat => cat.isSelected && cat.name === food.category);
      }

      // Filter by nutritional value
      if (this.minCalories && this.maxCalories) {
        nutritionalValueMatch = food.calories >= this.minCalories && food.calories <= this.maxCalories;
      }

      // Return true only if all filters match
      return titleMatch && categoryMatch && nutritionalValueMatch;
    });
  }

}
