import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionixService {
  private baseUrl = 'https://api.nutritionix.com/v1_1/';
  private apiKey = '28b01ba074af28d02ae97c7395cd81cb'; // Remplacez par votre clé API

  constructor(private http: HttpClient) { }

  searchFood(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search/${query}?results=0:10&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat&appId=${this.apiKey}`);
  }
}
