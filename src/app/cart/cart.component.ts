import { Component, OnInit } from '@angular/core';
import { ProductService } from '../ServiceProduct/product.service';
import { CartService } from '../ServiceProduct/CarteService';
import { Commandeline } from '../ModelProduct/Commandeline';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StripeComponent } from '../stripe/stripe.component';
import { StripeService } from '../ServiceProduct/StripeService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  commandelines: Commandeline[] = [];
  errorMessages: string[] = [];
totalPrice!: number ;
userId: number = 1;
amount !: number ;
currency !: string ;
  constructor(public cartService: CartService,private dialog: MatDialog ,private stripeService: StripeService ,private productService: ProductService
  ) {

   }

   ngOnInit(): void {
    this.fetchCommandelinesInCart();

  }

  fetchCommandelinesInCart(): void {
    const cartId = 2; // Replace with the actual cart ID
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
  
  onDeleteCommandeline(userId: number, productId: number): void {
    this.cartService.deleteCommandelineFromCart(userId, productId)
      .subscribe(
        () => {
          console.log('Commandeline deleted successfully');
          // Remove the deleted commandeline from the array
          const index = this.commandelines.findIndex(cmd => cmd.product.idPr === productId);
          if (index !== -1) {
            this.commandelines.splice(index, 1);
          }
        },
        error => {
          console.error('Error deleting commandeline:', error);
          // Handle error, display error message, etc.
        }
      );
  }
  
  onCheckoutClicked(): void {
    let quantityExceedsStock = true; // Flag to track if any quantity exceeds available stock
  
    // Iterate through each command line
    for (const commandeline of this.commandelines) {
      // Fetch the product associated with the command line
      this.productService.getProductById(commandeline.product.idPr).subscribe(
        product => {
          // Check if the quantity in the command line exceeds the available quantity of the product
          if (commandeline.quantity > product.quantityPr) {
            // Display error message
            alert('Quantity exceeds available stock for product: ' + product.name);
            // Set the flag to true if quantity exceeds stock
            quantityExceedsStock = true;
          }
        },
        error => {
          console.error('Error fetching product details:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  
    // Check the flag before proceeding to checkout
    if (!quantityExceedsStock) {
      // Proceed with checkout process if all quantities are valid
      console.log('Passing to Stripe for payment...');
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

















initiateCheckout(amount: number, currency: string, commandelines: any[]) {
  this.stripeService.createCharge(amount, currency, commandelines)
    .subscribe(
      (response) => {
        // Handle success response
        console.log('Charge created successfully:', response);
        // Optionally, navigate to a confirmation page or show a success message
      },
      (error) => {
        // Handle error response
        console.error('Error creating charge:', error);
        // Optionally, display an error message to the user
      }
    );
}


checkout(commandelines: any[]) {
  this.stripeService.processCheckout(commandelines)
    .subscribe(
      response => {
        console.log('Checkout successful:', response);
        // Proceed with payment logic here if needed
      },
      error => {
        console.error('Checkout error:', error);
        // Handle error messages and display them to the user
      }
    );
}

}
