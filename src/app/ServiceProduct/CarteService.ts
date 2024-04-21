import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Commandeline } from '../ModelProduct/Commandeline';


@Injectable({
  providedIn: 'root'
})
export class CartService {

    private apiUrl = 'http://localhost:8082/Cart'; // Replace with your Spring Boot backend URL
    private imageBaseUrl = 'http://192.168.174.134/uploads/';
    private apiUrl2 = 'http://localhost:8082/Commandeline';

  constructor(private http: HttpClient) { }

  getAllCommandelinesInCart(cartId: number): Observable<Commandeline[]> {
    return this.http.get<Commandeline[]>(`${this.apiUrl}/${cartId}/commandelines`);
  }
  getImageUrl(imagePath: string): string {
    return this.imageBaseUrl + imagePath;
  }

  getNumberOfCommandelinesInCart(cartId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${cartId}/count`);
  }

  private cartItemsSubject = new BehaviorSubject<Commandeline[]>([]);
  cartItems$: Observable<Commandeline[]> = this.cartItemsSubject.asObservable();


  getCartItems(): Commandeline[] {
    return this.cartItemsSubject.getValue(); // Return current cart items
  }
  updateCommandelineQuantity(commandelineId: number, newQuantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${commandelineId}?newQuantity=${newQuantity}`, null);
  }

}
