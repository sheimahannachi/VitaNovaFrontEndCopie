import { Component, OnInit } from '@angular/core';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: any[] = [];
  baseUrl: string = 'http://localhost:80/uploads/';
  foodForm : FormGroup;
  private router!: Router;
    constructor(private formBuilder: FormBuilder,private foodService: FoodService, private sanitizer: DomSanitizer, private route: Router) {
        this.foodForm = this.formBuilder.group({
            calories: ['', Validators.required], // Double attribute with required validator
            glucides: ['', Validators.required], // Double attribute with required validator
            protein: ['', Validators.required], // Double attribute with required validator
            lipides: ['', Validators.required], // Double attribute with required validator
            title: ['', [Validators.required, Validators.maxLength(20)]], // String attribute with required and max length validators
            category: ['', Validators.required],
            vitaminC: ['', Validators.required],
            vitaminB6: ['', Validators.required],
            vitaminE: ['', Validators.required],
            calcium: ['', Validators.required]

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

    downloadExcel(): void {
        // Filter out the specific columns you want to include in the Excel file
        const excelData = this.foods.map(({  category,title, calories, glucides, protein, lipides, vitaminC,vitaminB6,
        vitaminE,calcium }) => ({
            category,
            title,
            calories,
            glucides,
            protein,
            lipides,
            vitaminC,
            vitaminB6,
            vitaminE,
            calcium
        }));

        // Create a new instance of Workbook
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();

        // Create a worksheet with the filtered data
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

        // Add the worksheet to your workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Foods');

        // Generate a blob from your workbook in Excel format
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a blob from the Excel data array
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Download the Excel file
        const fileName = 'food-list.xlsx';
        saveAs(blob, fileName);
    }


}
