import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../Models/Exercise";

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

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.baseUrl}/GetExercise`);

  }

  deleteExercise(exerciseId: number): Observable<void> {
    const url = `${this.baseUrl}/ArchiverExercise/${exerciseId}`;
    return this.http.delete<void>(url);
  }

  updateExercise(formData: FormData, exerciseId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UpdateExercise/${exerciseId}`, formData, { observe: 'response' });
  }

}
