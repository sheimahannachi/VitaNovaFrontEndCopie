import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodTracker } from '../Models/PeriodTracker';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PeriodTrackerServiceService {
  private baseUrl='http://localhost:8081/PeriodTracker/';

  constructor(private http: HttpClient) {}

  // Method to add period information
  addPeriodInformation(periodTracker: PeriodTracker): Observable<PeriodTracker> {
    return this.http.post<PeriodTracker>(this.baseUrl + 'AddPeriodInformation', periodTracker);
  }

  getPeriodTracker(): Observable<PeriodTracker[]> {
    return this.http.get<PeriodTracker[]>(this.baseUrl + 'getPeriodTracker');
  }
  updatePeriodInformation(updatedPeriodTracker: PeriodTracker, idPeriod: number): Observable<PeriodTracker> {
    return this.http.put<PeriodTracker>(`${this.baseUrl}UpdatePeriodinformation?idPeriod=${idPeriod}`, updatedPeriodTracker);
  }
  getPeriodTrackerById(idPeriod: number): Observable<PeriodTracker> {
    return this.http.get<PeriodTracker>(`${this.baseUrl}getPeriodTrackerById/${idPeriod}`);
  }
  
  archivePeriod(idPeriod: number): Observable<string> {
    return this.http.put(`${this.baseUrl}archivePeriod?idPeriod=${idPeriod}`, null, { responseType: 'text' })
      .pipe(
        map(() => 'archived')
      );
  }
  getNonArchivedPeriodTrackers(): Observable<PeriodTracker[]> {
    return this.http.get<PeriodTracker[]>(`${this.baseUrl}nonArchivedPeriodTrackers`);
  }
 

  
}


