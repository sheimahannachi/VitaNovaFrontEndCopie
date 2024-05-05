import { Component, OnInit } from '@angular/core';
import { ProductService } from '../ServiceProduct/product.service';
import { CartService } from '../ServiceProduct/CarteService';
import { Commandeline } from '../ModelProduct/Commandeline';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StripeComponent } from '../stripe/stripe.component';
import { StripeService } from '../ServiceProduct/StripeService';
import { AuthService } from '../Service/auth.service';
import { UserModule } from '../Models/user.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  commandelines: Commandeline[] = [];
  errorMessages: string[] = [];
totalPrice!: number ;
user: UserModule;
currencyC : string ;
userName: string;
userId:number ;
  constructor(public cartService: CartService,private dialog: MatDialog ,private stripeService: StripeService ,private productService: ProductService ,private authService: AuthService, 
    private http: HttpClient
  ) {

   }

   ngOnInit(): void {
    this.getUserInfoFromToken();
  }

  getUserInfoFromToken(): void {
    this.authService.getUserInfoFromToken().subscribe(
      (response: UserModule) => {
      this.user = response;
      this.userId=this.user.idUser;
      this.fetchCommandelinesInCart();

      console.log('id user : ' , this.user.idUser);

    }
    );

      }
  fetchCommandelinesInCart(): void {

    // Replace with the actual cart ID
    this.cartService.getAllCommandelinesInCart(this.userId).subscribe(
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
  
  onDeleteCommandeline(productId: number): void {
    this.cartService.deleteCommandelineFromCart(this.userId, productId)
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
  let data:any= {

    "receiverWalletId": "663020aad65ce91d9ecb9ed9",
    "token": "TND",
    "amount": this.getTotalPrice()*1000,
    "type": "immediate",
    "description": "payment description",
    "acceptedPaymentMethods": [
      "wallet",
      "bank_card",
      "e-DINAR"
    ],
    "lifespan": 10,
    "checkoutForm": true,
    "addPaymentFeesToAmount": true,
    "firstName": "aziz",
    "lastName": "benslimene",
    "phoneNumber": "20616308",
    "email": "john.doe@gmail.com",
    "orderId": "1234657",
    "webhook": "https://merchant.tech/api/notification_payment",
    "silentWebhook": true,
    "successUrl": "http://localhost:4200/vitaNova/PayementSuccess",
    "failUrl": "https://dev.konnect.network/gateway/payment-failure",
    "theme": "light"
  }
  //http post link https://api.preprod.konnect.network/api/v2/payments/init-payment with header x-api-key header and data body
  this.http.post('https://api.preprod.konnect.network/api/v2/payments/init-payment', data, {
    headers: {
      'x-api-key': '663020aad65ce91d9ecb9ed5:S8rsq1bwkKSL9lpLpCb2zV9O'
    }
  }).subscribe((response) => {
    console.log(response);
    //redirect to the payment page from response the link is in response is payUrl external

    window.location.href = response['payUrl'];
  });

}
}

