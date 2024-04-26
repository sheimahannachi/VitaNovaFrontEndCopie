
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripeApiKey = 'sk_test_51P6CjQRozZ5IzKXIPsbKKfqSHLiyUbr98MgfQpqwxoiULglTxHru0QyeYKArfHE2bvYgSRMKZUnsDRpNisbHymdi00V6duA7cE'; // Ajoute ta clé publique Stripe ici
  private baseUrl = 'http://localhost:8082'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  createCharge(amount: number, currency: string, commandelines: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/charge`, { amount, currency, commandelines });
  }

  processCheckout(commandelines: any[]): Observable<string> {
    const url = `${this.baseUrl}/Commandeline/checkout`;
    return this.http.post<string>(url, commandelines).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('Product not found');
    } else if (error.status === 400) {
      return throwError('Bad request');
    } else {
      return throwError('An error occurred during checkout');
    }
  }
}
