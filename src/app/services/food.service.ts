import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../models/food";
import {FoodCard} from "../models/FoodCard";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl : string = 'http://localhost:8080/RestController'

  constructor(private http : HttpClient) { }
  addFood(formData: FormData): Observable<Food> {
    return this.http.post<any>(`${this.baseUrl}/addFood`, formData);
  }
  getFoods(page:number,size:number): Observable<Food[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Food[]>(`${this.baseUrl}/getFood`,{params});
  }
  archiveFood(id: number): Observable<Food> {
    return this.http.delete<Food>(`${this.baseUrl}/archiveFood/${id}`);
  }
  updateFood(formData: FormData,foodId:number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateFood/${foodId}`, formData,{ observe: 'response' });
  }



  getFoodById(id: number):Observable<Food>{
    return this.http.get<Food>(`${this.baseUrl}/getFood/${id}`);
  }
    addFoodCards(foods: Food[], quantity: number): Observable<any> {
        const url = `${this.baseUrl}/ListTracker`;

        // Construct query parameters
        let params = new HttpParams();
        foods.forEach(food => {
            params = params.append('foods', food.id); // Assuming 'id' is the property you want to send
        });
        params = params.append('quantity', quantity.toString());

        return this.http.post<any>(url, {}, { params: params });
    }
    getListEaten(): Observable<FoodCard[]> {
        return this.http.get<FoodCard[]>(`${this.baseUrl}/get-food-cards`);
    }
  deleteFoodCard(foodCard: FoodCard): Observable<any> {
    const url = `${this.baseUrl}/deleteFoodCard`;
    return this.http.delete(url, { body: foodCard });
  }
  updateFoodCards(foods: Food[], quantity: number): Observable<any> {
    const url = `${this.baseUrl}/updateFoodCard/{id}`;

    // Construct query parameters
    let params = new HttpParams();
    foods.forEach(food => {
      params = params.append('foods', food.id); // Assuming 'id' is the property you want to send
    });
    params = params.append('quantity', quantity.toString());

    return this.http.put<any>(url, {}, { params: params });
  }

}
