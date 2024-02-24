import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {

  URL="localhost:8081";
  addUrl="/addCommunity";
  updateUrl="/updateComunity";
  deleteByIdUrl="/deleteCommunity";
  findByIdUrl="/findCommunity";
  findAllUrl="/findAllCommunities";
  findByNom="/findCommunitiesByNom";


  constructor(private http: HttpClient) { }

                  //GET
  getComunity(id:Number):Observable<Community>{
    return this.http.get<Community>(this.URL+this.findByIdUrl+"/"+id);
  }

  getAllComunity():Observable<Community[]>{
    return this.http.get<Community[]>(this.URL+this.findAllUrl);
  }

  getByNomComunity(name:string):Observable<Community[]>{
    return this.http.get<Community[]>(this.URL+this.findAllUrl+"/"+name);
  }

                    //Post
  addCommunity(community:Community):Observable<Community>{
    return this.http.post<Community>(this.URL+this.addUrl,community);
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
