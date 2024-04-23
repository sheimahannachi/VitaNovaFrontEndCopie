import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Commandeline } from '../ModelProduct/Commandeline';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8082/Cart'; // Replace with your Spring Boot backend URL
  private imageBaseUrl = 'http://192.168.174.134/uploads/';
  private apiUrl2 = 'http://localhost:8082/Commandeline';
  private apiUrl3 = 'http://localhost:8082/Product';
  private numberOfCommandelinesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public numberOfCommandelines$: Observable<number> = this.numberOfCommandelinesSubject.asObservable();
  private cartItemsSubject = new BehaviorSubject<Commandeline[]>([]);
  public cartItems$: Observable<Commandeline[]> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllCommandelinesInCart(cartId: number): Observable<Commandeline[]> {
    return this.http.get<Commandeline[]>(`http://localhost:8082/Cart/commandelines/${cartId}`);
  }

  getImageUrl(imagePath: string): string {
    return this.imageBaseUrl + imagePath;
  }

  getNumberOfCommandelinesInCart(cartId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8082/Cart/count/${cartId}`);
  }

  getCartItems(): Commandeline[] {
    return this.cartItemsSubject.getValue(); // Return current cart items
  }

  updateCommandelineQuantity(commandelineId: number, newQuantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${commandelineId}/update?newQuantity=${newQuantity}`, null);
  }

  deleteCommandelineFromCart(userId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl3}/${userId}/cart/products/${productId}`;
    return this.http.delete(url);
  }
}
