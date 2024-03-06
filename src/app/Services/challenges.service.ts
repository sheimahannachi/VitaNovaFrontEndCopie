import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Challenges } from '../Model/Challenges';


@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  constructor(private http:HttpClient) { }

  URL="http://localhost:8081/";
  addUrl="addChallenge";
  updateUrl="updateChallenge";
  deleteUrl="deleteChallenge";
  findallActiveUrl="findAllActive";



  findAllActiveChallenges():Observable<Challenges[]>{
    return this.http.get<Challenges[]>(this.URL+this.findallActiveUrl);
  }

  addChallenge(challenge:Challenges, id:number):Observable<Challenges>{
    const params =new HttpParams().set('communityId',id);
    return this.http.post<Challenges>(this.URL+this.addUrl,challenge,{params});
  }
}
