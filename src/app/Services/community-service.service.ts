import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../Model/Community';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {

  URL="http://localhost:8081";
  addUrl="/addCommunity";
  updateUrl="/updateComunity";
  deleteByIdUrl="/deleteCommunity";
  findByIdUrl="/findCommunity";
  findAllUrl="/findAllCommunities";
  findByNom="/findCommunitiesByNom";
  getAllOrderByChallenges="/getCommunitiesOrderedByChallenges";


  constructor(private http: HttpClient) { }

                  //GET
  getComunity(id:Number):Observable<Community>{
    return this.http.get<Community>(this.URL+this.findByIdUrl+"/"+id);
  }

  getAllComunity(page:number):Observable<any>{
    let params=new HttpParams().set('page',page)
    return this.http.get<any>(this.URL+this.findAllUrl,{params});
  }

  getByNomComunity(name:string,page:number):Observable<any>{
    let params=new HttpParams().set('page',page)
    return this.http.get<any>(this.URL+this.findAllUrl+"/"+name,{params});
  }



  getCommunitiesOrderByChallenge(page:number):Observable<any>{
    let params=new HttpParams().set('page',page);
    return this.http.get<any>(this.URL+this.getAllOrderByChallenges,{params});
  }

                    //Post
  addCommunity(community:Community, id:number):Observable<Community>{
    return this.http.post<Community>(this.URL+this.addUrl+"/"+id,community);
  }

            //Update
  updateCommunity(community:Community,id:Number):Observable<Community>{
  return this.http.put<Community>(this.URL+this.updateUrl+"/"+id,community);
 }


            //Delete

deleteComunity(id:Number):Observable<Community>{
return this.http.delete<Community>(this.URL+this.deleteByIdUrl+"/"+id);
}

}
