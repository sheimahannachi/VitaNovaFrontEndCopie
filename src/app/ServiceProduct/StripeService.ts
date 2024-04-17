
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripeApiKey = 'sk_test_51P6CjQRozZ5IzKXIPsbKKfqSHLiyUbr98MgfQpqwxoiULglTxHru0QyeYKArfHE2bvYgSRMKZUnsDRpNisbHymdi00V6duA7cE'; // Ajoute ta clé publique Stripe ici
  private baseUrl = 'http://localhost:8082'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  processPayment(token: string, amount: number, currency: string): Observable<any> {
    const url = `${this.baseUrl}/charge`;
    const body = { token, amount, currency };
    return this.http.post<any>(url, body);
  }
}
