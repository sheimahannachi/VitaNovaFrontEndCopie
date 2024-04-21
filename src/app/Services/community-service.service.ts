import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../Model/Community';
import { UserModule } from '../Models/user.module';


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
  addMemberToCommunityURL='/addMemberToComunity';
  fetchTopThreeURL="/getTopThreeByCommunity";
  getCommunityMembersURL="/communityMembers";
  getCommunitybyUser="/communityByUser";


  constructor(private http: HttpClient) { }

                  //GET
  getComunity(id:Number):Observable<Community>{
    return this.http.get<Community>(this.URL+this.findByIdUrl+"/"+id);
  }
  getCommunityByUser(userId: number): Observable<Community> {
    let params = new HttpParams().set('userId', userId);
    return this.http.get<Community>(this.URL + this.getCommunityByUser, { params,withCredentials:true });
}

  getAllComunity(page:number,size:number):Observable<any>{
    let params=new HttpParams().set('page',page).set('size',size);
    return this.http.get<any>(this.URL+this.findAllUrl,{params});
  }

  getByNomComunity(name:string,page:number):Observable<any>{
    let params=new HttpParams().set('page',page);
    return this.http.get<any>(this.URL+this.findAllUrl+"/"+name,{params});
  }



  getCommunitiesOrderByChallenge(page:number):Observable<any>{
    let params=new HttpParams().set('page',page);
    return this.http.get<any>(this.URL+this.getAllOrderByChallenges,{params,withCredentials:true});
  }

  getTopThreeByCommunity(communityId:number):Observable<any>{
    let params=new HttpParams().set('communityId',communityId);
    return this.http.get<any>(this.URL+this.fetchTopThreeURL,{params,withCredentials:true});
  }

  getCommunityMembers(comunityId:number):Observable<UserModule[]>{
    let params=new HttpParams().set('comunityId',comunityId)
    return this.http.get<UserModule[]>(this.URL+this.getCommunityMembersURL,{params});
  }

                    //Post
  addCommunity(community:Community, id:number):Observable<Community>{
    return this.http.post<Community>(this.URL+this.addUrl+"/"+id,community,{withCredentials:true});
  }

            //Update
  updateCommunity(community:Community,id:Number):Observable<Community>{
  return this.http.put<Community>(this.URL+this.updateUrl+"/"+id,community);
 }



 addMemberToCommunity(userId:number,communityId:number):Observable<boolean>{
  let params=new HttpParams()
  .set('userId',userId)
  .set('communityId',communityId);
  return this.http.put<boolean>(this.URL+this.addMemberToCommunityURL,{params});
 }

 


            //Delete

deleteComunity(id:Number):Observable<Community>{
return this.http.delete<Community>(this.URL+this.deleteByIdUrl+"/"+id,{withCredentials:true});
}

}
