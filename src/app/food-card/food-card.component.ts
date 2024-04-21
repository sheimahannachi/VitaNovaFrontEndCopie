import {Component, Input, OnInit} from '@angular/core';
import { Food } from '../Models/Foods';
import {FoodService} from "../Service/food.service";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsDialogComponent } from '../food-details-dialog/food-details-dialog.component';
import {BarcodeScannerService} from "../barcode-scanner.service";

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {
  foods: Food[] = [];
  baseUrl: string = 'http://localhost:80/uploads/';
  filteredFoods: Food[] = [];
  searchTitle: string = '';
  selectedCategories: string[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;

  minCalories: string = "0";
  maxCalories: string = "800";
  scannedBarcode!: string;
  productDetails: any;
  ngOnInit() {
    this.getFoods(1,10);
    this.updateMaxCalories();
    this.updateMinCalories();
  }
  updateMaxCalories() {


    const minValue = parseFloat(this.minCalories);
    const maxValue = parseFloat(this.maxCalories);

    if (isNaN(minValue) || isNaN(maxValue)) {
      console.error('Invalid calories value:', this.minCalories, this.maxCalories);
      return;
    }

    const minPercent = (minValue / 800) * 100;
    const maxPercent = (maxValue / 800) * 100;



    if (maxValue <= minValue) {
      this.maxCalories = (minValue + 1).toString();
    }

    if (maxValue > 800) {
      this.maxCalories = '800';
    }


    this.filter();
  }


  updateMinCalories() {


    const minValue = parseFloat(this.minCalories);
    const maxValue = parseFloat(this.maxCalories);

    if (isNaN(minValue) || isNaN(maxValue)) {
      console.error('Invalid calories value:', this.minCalories, this.maxCalories);
      return;
    }

    const minPercent = (minValue / 800) * 100;
    const maxPercent = (maxValue / 800) * 100;


    if (minValue >= maxValue) {
      this.minCalories = (maxValue - 1).toString();
    }

    if (minValue < 0) {
      this.minCalories = '0';
    }


    this.filter();
  }
  constructor(private foodService: FoodService,private router: Router,public dialog: MatDialog,private barcodeScannerService: BarcodeScannerService) {
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



  filter(): void {

    const minValue = parseFloat(this.minCalories);
    const maxValue = parseFloat(this.maxCalories);

    if (isNaN(minValue)) {
      console.error('Invalid minimum calories value:', this.minCalories);
      return;
    }

    if (this.maxCalories !== undefined) {
      this.filteredFoods = this.foods.filter(food => {
        return food.calories >= minValue && food.calories <= maxValue;
      });
    } else {
      this.filteredFoods = this.foods.filter(food => {
        return food.calories >= minValue;
      });
    }
  }
// retrieveFoodByCaloriesRange(): void {
//     this.filteredFoods = this.foods.filter(food => {
//         return food.calories >= this.minCalories && food.calories <= this.maxCalories;
//     });
// }

  getFoods(page: number, size: number): void {
    this.foodService.getFoods(page, size).subscribe(
      (pageData: any) => {
        if (Array.isArray(pageData.content)) {
          this.totalElements = pageData.totalElements;
          this.totalPages = pageData.totalPages;
          this.currentPage = pageData.number;
          this.foods = pageData.content;
          this.filteredFoods = [...this.foods];
          this.foods.forEach(food => {
            food.foodPic = this.baseUrl + food.foodPic;
          });
        } else {
          console.error('Expected an array of foods in pageData.content, but received:', pageData.content);
        }
      },
      error => {
        console.error('Failed to fetch foods:', error);
      }
    );
  }
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      let nextPage = this.currentPage + 1;
      let size = 10; // Default size for pages greater than 1
      if (nextPage === 1 || nextPage === 2) {
        size = 10; // Size for the first two pages
      }
      this.getFoods(nextPage, size);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      let previousPage = this.currentPage - 1;
      let size = 10; // Default size for pages greater than 0
      if (previousPage === 0 || previousPage === 1) {
        size = 10; // Size for the first two pages
      } else {
        size = 10; // Size for the rest of the pages
      }
      this.getFoods(previousPage, size);
    }
  }


  applyFilters(): void {
    this.filteredFoods = this.foods.filter(food => {
      // Filter by title
      const titleMatch = food.title.toLowerCase().includes(this.searchTitle.toLowerCase());

      // Filter by calories
      const caloriesMatch = this.minCalories === '' || this.maxCalories === '' ||
        (food.calories >= parseFloat(this.minCalories) && food.calories <= parseFloat(this.maxCalories));

      return titleMatch && caloriesMatch;
    });
  }
  async scanBarcode(): Promise<void> {
    try {
      this.productDetails = await this.barcodeScannerService.getProductDetailsFromScannedBarcode();
      console.log(this.productDetails)
    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  }






}
