import {Component, OnInit} from '@angular/core';
import { Food } from '../models/food';
import { FoodService } from '../services/food.service';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit{
    newFood: Food = new Food();
    selectedFile: File | null = null; // Variable to store the selected file
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
            ingredients: ['', Validators.required] ,// String attribute with required validator
            foodPic: [null, Validators.required]
    });

    }
    ngOnInit(): void {
        const foodData: Food | null = history.state.food;
        if (foodData) {
            this.newFood = foodData;
            this.populateFormWithFoodData();
        } else {
            console.error("Food data is not present in the state.");
        }
    }

    onSubmit(): void {
        if (this.newFood.id) {
            this.updateFood();
        } else {
            this.addFood();
        }
    }
    addFood():void{
      if(this.selectedFile) {
          const formData = new FormData();
          // Append food data to FormData
          formData.append('code', this.foodForm.get('code')!.value);
          formData.append('title', this.foodForm.get('title')!.value);
          formData.append('calories', this.foodForm.get('calories')!.value );
          formData.append('glucides', this.foodForm.get('glucides')!.value);
          formData.append('protein', this.foodForm.get('protein')!.value);
          formData.append('lipides', this.foodForm.get('lipides')!.value);
          formData.append('ingredients', this.foodForm.get("ingredients")!.value);

          // Append image file to FormData
          formData.append('pic', this.selectedFile);

          this.foodService.addFood(formData).subscribe(() => {
              this.foodForm.reset();
              this.selectedFile = null;
          });
      }else {
          console.error('Please select an image file.');
      }

    }
    updateFood():void{
        if(this.selectedFile) {
            const formData = new FormData();
            // Append food data to FormData
            formData.append('code', this.foodForm.get('code')!.value);
            formData.append('title', this.foodForm.get('title')!.value);
            formData.append('calories', this.foodForm.get('calories')!.value );
            formData.append('glucides', this.foodForm.get('glucides')!.value);
            formData.append('protein', this.foodForm.get('protein')!.value);
            formData.append('lipides', this.foodForm.get('lipides')!.value);
            formData.append('ingredients', this.foodForm.get("ingredients")!.value);
            // Append image file to FormData
            formData.append('pic', this.selectedFile);

            this.foodService.updateFood(formData,this.newFood.id).subscribe(() => {
                this.foodForm.reset();
                this.selectedFile = null;
            });
        }else {
            console.error('Please select an image file.');
        }

    }

    onFileSelected(event: any): void {
        // Récupérer le fichier sélectionné
        this.selectedFile = event.target.files[0] as File;



    }

    getSelectedFileUrl(): SafeUrl | null {
        if (this.selectedFile) {
            const url = window.URL.createObjectURL(this.selectedFile);
            return this.sanitizer.bypassSecurityTrustUrl(url);
        } else {
            return null;
        }
    }
    populateFormWithFoodData(): void {
        this.foodForm.patchValue({
            code: this.newFood.code,
            calories: this.newFood.calories,
            glucides: this.newFood.glucides,
            protein: this.newFood.protein,
            lipides: this.newFood.lipides,
            ingredients: this.newFood.ingredients,
            title: this.newFood.title,
            foodPic : this.newFood.foodPic,

        });
    }
}
