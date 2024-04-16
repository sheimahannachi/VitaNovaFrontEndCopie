import { Component, Inject, ViewChild } from '@angular/core';
import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
  CreateTokenCardData,
} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { PaymentPayload } from './PaymentPayload';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeTest: FormGroup;

  name: string;
  loading = false;

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { amount: number },

    private stripeService: StripeService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.stripeTest = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expDate: ['', [Validators.required]],
      cvc: ['', Validators.required]
    });
  }

  submitPayment() {
    const expDateValue = this.stripeTest.value.expDate;
    console.log('Expiration date value:', expDateValue);
    this.loading = true;
    const payload: PaymentPayload = {
      amount: this.data.amount, 
      name: this.stripeTest.value.name,
      cardNumber: "4242424242424242",
      expDate: this.stripeTest.value.expDate,
      cvc: this.stripeTest.value.cvc,
      stripeToken: "tok_visa",
    };
    console.log(payload)

    // Send the payload to your backend endpoint
    this.http.post('http://localhost:8081/checkout/process-payment', payload)
      .subscribe(
        (response) => {
          // Handle successful response, such as redirecting to a success page
          console.log('Payment processed successfully:', response);
        },
        (error) => {
          // Handle error
          this.loading = false;
          console.error('Error processing payment:', error);
        }
      );
  }
}