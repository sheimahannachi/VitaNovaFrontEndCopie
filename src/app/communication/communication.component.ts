import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CommunicationServiceService } from '../Services/communication-service.service';



import { Subscription } from 'rxjs';
import { Communication } from '../Model/Communication';
import { ERole, Gender, UserModule } from '../Model/user/user.module';
import { DateAdapter } from '@angular/material/core';
import { Community } from '../Model/Community';
import { CommunityServiceService } from '../Services/community-service.service';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements AfterViewInit {
  @ViewChild('messagesList') htmlMessages:ElementRef; 
  @Input() idFromParent:number;
  @Input() communityMembers:UserModule[];
  
  user:UserModule = {
    idUser: 1,
    firstName: "firas",
    lastName: "hanini",
    email: "",
    weight: 0,
    height: 0,
    password: "",
    username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER,
    communities:null
  };
  
   userList:UserModule[]= [
   
    {
      idUser: 6,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      weight: 65,
      height: 165,
      password: "strongPassword456",
      username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER,
    communities:null
    },
    {
      idUser: 7,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      weight: 65,
      height: 165,
      password: "strongPassword456",
      username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER,
    communities:null
    },
    {
      idUser: 8,
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      weight: 65,
      height: 165,
      password: "strongPassword456",
      username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER,
    communities:null
    },
    
  ];
/*
  communicationList: Communication[] = [
    {
      id: 1,
      message: "Bonjour, comment ça va ?",
      sentDate: new Date("2024-02-27T08:00:00"),
      seen: false,
      sender: this.user
    },
    {
      id: 2,
      message: "Tout va bien, merci !",
      sentDate: new Date("2024-02-27T08:05:00"),
      seen: true,
      sender: this.user
    },
    {
      id: 3,
      message: "Avez-vous terminé le rapport ?",
      sentDate: new Date("2024-02-27T08:10:00"),
      seen: false,
      sender: this.userList[2]
    },
    {
      id: 2,
      message: "Tout va bien, merci !",
      sentDate: new Date("2024-02-27T08:05:00"),
      seen: true,
      sender: this.user
    },
    {
      id: 3,
      message: "Avez-vous terminé le rapporteeeeeeee ?",
      sentDate: new Date("2024-02-27"),
      seen: false,
      sender: this.userList[2]
    },
    
    
  ];*/

  subscription:Subscription;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
page:number;
//bd old messages
messages:Communication[]=[];
//Community name waiting for session

//Community members
members:UserModule[]  // User[]=[]

// Sending message

message:string="";

//Message resieved 

current=this.user; //this.user; //User
communityId:number;
community:Community=new Community();

constructor(private service:CommunicationServiceService,private comService:CommunityServiceService ){

    this.subscription=this.service.fonctionAppelee.subscribe((comunication:Communication)=>{
      this.handleMessage(comunication);
      
    })

    this.page=0;
    this.members=[];
    
   

  }
  ngAfterViewInit(): void {
  
    this.scrollToBottom();
  }

  scrollToBottom(){
    
    
      const element = this.htmlMessages.nativeElement;
      element.scrollTop=element.scrollHeight;
      console.log("HERE "+ element.scrollHeight);
      
    
  }



  pagePlus() {
    this.page=this.page+1;
    this.getAllCommunicationByCommunity();
    }







 

ngOnInit(){

  this.communityId=this.idFromParent;
  this.service.communityId=this.communityId;
  this.community.id=this.communityId;
 // this.messages=this.communicationList;
 
  this.connect();
  this.getAllCommunicationByCommunity();
  this.getMembres();
  
  
}



/*  getAllcomunication(){
    this.service.findysenderAndReciever.Subscribe(mes=>this.Messages=mes)
  }*/

  getAllCommunicationByCommunity(){
    
    this.service.findByCommunity(this.communityId,this.page).subscribe(response=>{
      if(this.messages.length==0){
      this.messages=response.content.reverse();
      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
      }else{
        this.messages=response.content.reverse().concat(this.messages)
      }
     

    })
  }


  handleMessage(communication:Communication) {
    
    this.messages.push(communication);
    setTimeout(() => {
      this.scrollToBottom();
    }, 10);
  }

  connect(){
    this.service._connect();
  }

  disconnect(){
    this.service._disconnect();
    this.subscription.unsubscribe();
  }

  
  sendMessage(){
    var com:Communication=new Communication();
    com.sender=this.current;
    com.sentDate= new Date();
    com.message=this.message;
    com.community=this.community;
    

    this.service._send(com);
    
    this.message="";
    
    
    
  }


  getMembres(){
    this.comService.getCommunityMembers(this.communityId).subscribe(response=>{
      this.members=response;
      console.log("got members "+response);
    },error=>{
      console.error("an error ocured ");
    })
  }


}
