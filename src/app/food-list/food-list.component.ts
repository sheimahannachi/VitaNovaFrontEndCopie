import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  baseUrl: string = 'http://localhost:80/uploads/';
  foodForm : FormGroup;
  private router!: Router;
    constructor(private formBuilder: FormBuilder,private foodService: FoodService, private sanitizer: DomSanitizer, private route: Router) {
        this.foodForm = this.formBuilder.group({
            code: ['', Validators.required], // String attribute with required validator
            calories: ['', Validators.required], // Double attribute with required validator
            glucides: ['', Validators.required], // Double attribute with required validator
            protein: ['', Validators.required], // Double attribute with required validator
            lipides: ['', Validators.required], // Double attribute with required validator
            title: ['', [Validators.required, Validators.maxLength(20)]], // String attribute with required and max length validators
            ingredients: ['', Validators.required], // String attribute with required validator
          category: ['', Validators.required]
        });
      this.router=route;
  }

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods(): void {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
      this.foods.forEach(foods => {
        foods.foodPic = this.baseUrl + foods.foodPic;
      });
    });
  }
  archiveFood(food: Food): void {
    if (confirm('Are you sure you want to delete this article?')) {
        this.foodService.archiveFood(food.id)
            .subscribe(() => {
                this.foods = this.foods.filter(f => f.id !== food.id);
                alert('Article deleted successfully.');
                // Mettre à jour la liste des aliments après l'archivage// Assurez-vous d'avoir une méthode pour récupérer les aliments
            }, error => {
                console.error('Error deleting article:', error);
                alert('Failed to delete article.');
            });
    }
  }
    editFood(food: Food): void {
        // Navigate to the "AddFood" page with the selected food details
        this.router.navigate(['/admin/addFood'], { state:{food,foodId:food.id}});
    }
  goToAddFoodPage(): void {
    this.router.navigate(['/admin/addFood']);
  }



}
