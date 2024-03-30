import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError } from 'rxjs';
import { Product } from '../ModelProduct/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8082/Product';
  private imageBaseUrl = 'http://192.168.174.134/uploads/';

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

  addLike(/*idUser: number,*/ idPr: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addLike/${idPr}`, {/*idUser,*/ idPr});
  }
 





  
  filterProducts(categorie: string | null, price: number | null): Observable<Product[]> {
    // Créer les paramètres de la requête HTTP
    let params = new HttpParams();
    
    // Si la catégorie est définie et n'est pas "ALL", ajouter le paramètre de catégorie à la requête
    if (categorie !== null && categorie !== 'ALL' && ['NUTRITION', 'Fitness_Equipement', 'Mentall_wellbeing'].includes(categorie)) {
      params = params.set('categoriePr', categorie); // Ajouter le paramètre 'categoriePr' avec la valeur de la catégorie à la requête
    }
    
    // Ajouter le paramètre de prix à la requête si défini
    if (price !== null) {
      params = params.set('pricePr', price.toString()); // Ajouter le paramètre 'pricePr' avec la valeur du prix à la requête
    }
  
    // Effectuer une requête HTTP GET avec les paramètres définis
    return this.http.get<Product[]>(`${this.baseUrl}/filter`, { params }).pipe(
      catchError(error => {
        console.error('Erreur lors du filtrage des produits :', error); // Afficher l'erreur s'il y a lieu
        throw error; // Relancer l'erreur pour la gestion ultérieure
      })
    );
}


}

 
