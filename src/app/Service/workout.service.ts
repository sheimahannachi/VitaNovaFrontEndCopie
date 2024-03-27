import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../Models/Exercise";
import {UserRating} from "../Models/UserRating";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private baseUrl: string = 'http://localhost:8081/RestController';


  constructor(private http: HttpClient) {
  }

  /*addExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.baseUrl + 'addExercise', Exercise)

  }
*/
  // Update the addExercise method in the WorkoutService
  // Update the addExercise method in the WorkoutService
  /*addExercise(data: Exercise | FormData): Observable<any> {
    if (data instanceof FormData) {
      return this.http.post(`${this.baseUrl}addExercise`, data);
    } else {
      const formData = new FormData();
      const exerciseData = data as Exercise; // Type assertion
      for (const key in exerciseData) {
        if (exerciseData.hasOwnProperty(key)) {
          formData.append(key, (exerciseData as any)[key] as string); // Type assertion for data[key]
        }
      }
      return this.http.post(`${this.baseUrl}addExercise`, formData);
    }*/
  addExercise(exercise: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addExercise`, exercise, {observe: 'response'});
  }

  getExercises(page:number,size:number): Observable<Exercise[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Exercise[]>(`${this.baseUrl}/GetExercise`,{params});

  }

  deleteExercise(exerciseId: number): Observable<void> {
    const url = `${this.baseUrl}/ArchiverExercise/${exerciseId}`;
    return this.http.delete<void>(url);
  }

  updateExercise(formData: FormData, exerciseId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UpdateExercise/${exerciseId}`, formData, { observe: 'response' });
  }
  getActiveExercises(page:number,size:number): Observable<Exercise[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Exercise[]>(`${this.baseUrl}/GetActiveExercise`,{params});}
  rateExercise(exerciseId: number, rate: number) {
    return this.http.post(`${this.baseUrl}/rateExercise/${exerciseId}/${rate}`,{});
  }
  saveUserExerciseRating(userExerciseRating:UserRating,idEx:number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveUserExerciseRating/${idEx}`, userExerciseRating);
  }
  getExerciseById(exerciseId: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.baseUrl}/getExerciseById/${exerciseId}`);
  }
  getAverageRating(exerciseId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Rating/${exerciseId}`);
  }
  searchExercises(bodyPart: string, searchText: string): Observable<Exercise[]> {
    const params = {
      bodyPart: bodyPart || '',
      searchText: searchText || ''
    };
    return this.http.get<Exercise[]>(`${this.baseUrl}/searchEx`, { params });
  }
  addPlan(workoutplan: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addPlan`, workoutplan, {observe: 'response'});
  }

}
