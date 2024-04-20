import { Component, OnInit } from '@angular/core';
import { FoodService } from '../Service/food.service';
import {FoodCard} from "../models/FoodCard";
import {FoodDetailsDialogComponent} from "../food-details-dialog/food-details-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-foodlistadded',
    templateUrl: './foodlistadded.component.html',
    styleUrls: ['./foodlistadded.component.css']
})
export class FoodlistaddedComponent implements OnInit {

  eatenFoodCards: FoodCard[] = [];
  loading = true;
  error: string | null = null;

  constructor(private foodService: FoodService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEatenFoods();
  }

  getEatenFoods(): void {
    this.foodService.getListEaten().subscribe(
      (foodCards: Array<FoodCard>) => { // Specify the type as Array<FoodCard>
        this.eatenFoodCards = foodCards;
        this.loading = false;
      },
      (error) => {
        this.error = 'Error fetching eaten foods: ' + error;
        this.loading = false;
      }
    );
  }

  deleteFoodCard(foodCard: FoodCard): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this food card?');
    if (isConfirmed) {
      this.foodService.deleteFoodCard(foodCard).subscribe(
        () => {
          // Suppression réussie
          // Mettre à jour la liste des cartes alimentaires si nécessaire
          this.getEatenFoods();
        },
        (error) => {
          console.error('Error deleting food card:', error);
          // Gérer l'erreur ici
        }
      );
    } else {
      // Annulation de la suppression
      console.log('Suppression annulée');
    }
  }

  calculateCalories(foodCard: FoodCard): void {
    foodCard.calcCalories = foodCard.food.calories * foodCard.quantity;

    // Mettre à jour la quantité dans la liste des cartes alimentaires
    const existingFoodCard = this.eatenFoodCards.find(card => card.foodId === foodCard.foodId);
    if (existingFoodCard) {
      existingFoodCard.quantity = foodCard.quantity;
      // Enregistrer les modifications sur le serveur
      this.foodService.updateFoodCards([existingFoodCard.food], existingFoodCard.quantity).subscribe(
        () => {
          console.log('Food card updated successfully');
        },
        (error) => {
          console.error('Error updating food card:', error);
        }
      );
    } else {
      // Si le FoodCard n'existe pas encore dans la liste, l'ajouter
      this.eatenFoodCards.push(foodCard);
      // Enregistrer le nouveau FoodCard sur le serveur
      this.foodService.updateFoodCards([foodCard.food], foodCard.quantity).subscribe(
        () => {
          console.log('New food card created successfully');
        },
        (error) => {
          console.error('Error creating new food card:', error);
        }
      );
    }
  }



}
