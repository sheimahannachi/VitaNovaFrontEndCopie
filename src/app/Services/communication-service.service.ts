import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  constructor(private http:HttpClient) { }
  URL="localhost:8081";
  addUrl="/addCommunication";
  updateUrl="/updateCommunication";
  deleteUrl="/deleteCommunication";
  findCommunicationById="/findCommunication";
  findBySenderAndRecieverUrl="/findBySenderAndReciever";



                    //Get
  findyId(id:Number):Observable<Communication>{
    return this.http.get<Communication>(this.URL+this.findCommunicationById+"/"+id);
  }
/*
  findysenderAndReciever(sender:User, reciever:User):Observable<Communication>{
    return this.http.get<Communication>(this.URL+this.findBySenderAndRecieverUrl,sender,reciever);
  }
*/
                      //add
  addCommunication(communication:Communication):Observable<Communication>{
    return this.http.post<Communication>(this.URL+this.addCommunication,communication);
  }   



                      //Update
  updateCommunication(communication:Communication,id:Number):Observable<Communication>{
      return this.http.put<Communication>(this.URL+this.updateCommunication+"/"+id,communication);
  } 

                      //Delete
  deleteCommunication(id:Number):Observable<Communication>{
        return this.http.delete<Communication>(this.URL+this.updateCommunication+"/"+id,);
    }
  


}
