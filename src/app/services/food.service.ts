import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Food} from "../models/food";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private baseUrl : string = 'http://localhost:8081/RestController'

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


}
