import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Product } from '../ModelProduct/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8082/Product';
  private imageBaseUrl = 'http://localhost:80/aziz/';

  constructor(private http: HttpClient) { }

  addProduct(produit: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, produit, { observe: 'response' });
  }

  showProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getProducts`);
  }

  archiverProduct(productId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${productId}`, null);
  }


  updateProduct(formData: FormData, productId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateProduct/${productId}`, formData);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProductById/${productId}`);
  }
  getImageUrl(imagePath: string): string {
    return this.imageBaseUrl + imagePath;
  }

  searchProductsByName(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search?term=${searchTerm}`);
  }
}

 
