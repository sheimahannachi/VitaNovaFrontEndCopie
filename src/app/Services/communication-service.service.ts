import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Communication } from '../Model/Communication';

@Injectable({
  providedIn: 'root'
})
export class CommunicationServiceService {

  public fonctionAppelee: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http:HttpClient) { }
  URL="http://localhost:8081";
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
  



           ////////Web socket Messaging 

           communityId:Number=0;
           webSocketEndPoint: string = 'http://localhost:8081/ws';
           topic:string="/topic/";
           sendMessage:string="/app/chat.sendMessage/"
         
           stompClient:any=null;
         
         
           _connect() {
             console.log("Initialize WebSocket Connection");
             console.log("soket houna"+this.communityId);
             let ws = new SockJS(this.webSocketEndPoint);
             this.stompClient = Stomp.over(ws);
             const _this = this;
             _this.stompClient.connect({}, this.onConnected.bind(_this), this.errorCallBack);
         };
         
         
         
          onConnected=()=> {
           console.log(this.communityId);
         
           //////////////////////////////////////////////////////////////////////////////////////////////////
           // Subscribe to the community Topic
           this.stompClient.subscribe(this.topic+this.communityId, this.onMessageReceived);
           
         
           
         }
         
         _disconnect() {
           if (this.stompClient !== null) {
               this.stompClient.disconnect();
           }
           console.log("Disconnected");
         }
         
         
         errorCallBack(error:Communication) {
           console.log("errorCallBack -> " + error.message)
           setTimeout(() => {
               this._connect();
           }, 5000);
         }
         
         //Communication
         _send(message:Communication) {
           console.log("calling logout api via web socket");
         
           this.stompClient.send(this.sendMessage+this.communityId, {}, JSON.stringify(message));
         
         }
         
         comm!:Communication;
         onMessageReceived(message:Communication) {
           console.log("Message Recieved from Server :: " + message.message +" "+message.sentDate);
           this.fonctionAppelee.emit(message);
         } 

}
