import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { loadStripe } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { Observable, switchMap } from 'rxjs';
import { CheckoutComponent } from '../checkout/checkout.component';
@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  styleUrls: ['./dialog-plan.component.css']
})

export class DialogPlanComponent implements OnInit {
  showPaymentForm: boolean = false;
  stripe: any;
  card: any;
  stripeKey: string;
amount:number;
  private configUrl = 'assets/configAmine.json';
  priceId: string;

  constructor( private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,private stripeService: StripeService
) { }

togglePaymentForm(amount:number) {
  this.showPaymentForm = !this.showPaymentForm;
  if (this.showPaymentForm) {
    this.dialog.closeAll();
    // Open the CheckoutComponent as a new dialog
    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '500px', // Set the width and other configurations as needed
      data: { amount:amount }
    });

    // Close the current dialog when the new dialog is opened
    dialogRef.afterOpened().subscribe(() => {
    });
  }
}


  ngOnInit(): void {
    this.getkey();

  }




  
  getConfig(): Observable<any> {
    return this.http.get<any>(this.configUrl);
  }

  getkey() {
    this.getConfig().subscribe(config => {
      this.stripeKey = config.stripeKey;
      console.log("key : ", this.stripeKey); // This will log the correct key
    });
  }
}
