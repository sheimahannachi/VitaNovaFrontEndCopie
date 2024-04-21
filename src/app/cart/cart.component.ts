import { Component, OnInit } from '@angular/core';
import { ProductService } from '../ServiceProduct/product.service';
import { CartService } from '../ServiceProduct/CarteService';
import { Commandeline } from '../ModelProduct/Commandeline';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StripeComponent } from '../stripe/stripe.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  commandelines: Commandeline[] = [];
totalPrice!: number ;
  constructor(public cartService: CartService,private dialog: MatDialog 
  ) {

   }

  ngOnInit(): void {
    this.fetchCommandelinesInCart();

  }

  fetchCommandelinesInCart(): void {
    const cartId = 3; // Replace with the actual cart ID
    this.cartService.getAllCommandelinesInCart(cartId).subscribe(
      commandelines => {
        this.commandelines = commandelines;
      },
      error => {
        console.error('Error fetching command lines:', error);
        // Handle error, e.g., show an error message
      }
    );
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const commandeline of this.commandelines) {
      totalPrice += commandeline.product.pricePr * commandeline.quantity;
    }
    return totalPrice;
  }

  onProductDeleted(productId: number) {
    const index = this.commandelines.findIndex(commandeline => commandeline.product.idPr === productId); // Find the index of the product in the commandelines array
    if (index !== -1) {
      this.commandelines.splice(index, 1); // Remove the product from the commandelines array
    }
  }
  
  updateQuantity(commandelineId: number, newQuantity: number) {
    // Récupérer la commande à partir de l'ID de la commande
    const commandeline = this.commandelines.find(cmd => cmd.idOrder === commandelineId);
    
    if (commandeline) {
      // Mettre à jour la quantité de la commande
      commandeline.quantity = newQuantity;
      
      // Appeler le service pour mettre à jour la quantité dans la base de données
      this.cartService.updateCommandelineQuantity(commandelineId, newQuantity).subscribe(
        () => {
          console.log('Quantité de la commande mise à jour avec succès !');
          // Mettre à jour le total ou effectuer d'autres actions si nécessaire
        },
        error => {
          console.error('Erreur lors de la mise à jour de la quantité de la commande :', error);
          // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }
      );
    }
  }
  
  


  openStripeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '500px'; // Set the width of the dialog
    dialogConfig.data = {
      totalPrice: this.getTotalPrice() // Pass the total price as data to the dialog
    };

    this.dialog.open(StripeComponent, dialogConfig);
}

}
