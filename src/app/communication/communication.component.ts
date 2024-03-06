import { Component } from '@angular/core';
import { CommunicationServiceService } from '../Services/communication-service.service';



import { Subscription } from 'rxjs';
import { Communication } from '../Model/Communication';
import { ERole, Gender, UserModule } from '../Model/user/user.module';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent {

   /* user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    weight: number;
    height: number;
    password: string;
  }*/
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
    role:ERole.ROLE_USER
  };
  
   userList:UserModule[]= [
    {
      idUser: 2,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      weight: 70,
      height: 180,
      password: "securePassword123",
      username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER
    },
    {
      idUser: 3,
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
    role:ERole.ROLE_USER
    },
    {
      idUser: 4,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      weight: 80,
      height: 175,
      password: "safePassword789",
      username: '',
    dateOfBirth: undefined,
    gender: Gender.MALE,
    archive: false,
    picture: '',
    role:ERole.ROLE_USER
    },
  ];

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
      sender: this.userList[3]
    },
    {
      id: 3,
      message: "Avez-vous terminé le rapport ?",
      sentDate: new Date("2024-02-27T08:10:00"),
      seen: false,
      sender: this.userList[2]
    },
    
  ];

  subscription:Subscription;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(private service:CommunicationServiceService ){

    this.subscription=this.service.fonctionAppelee.subscribe((comunication:Communication)=>{
      this.handleMessage(comunication);
    })

  }
//bd old messages
  messages:Communication[]=this.communicationList;
  //Community name waiting for session
  CommunityName:string="one";
  //Community members
  members=this.userList;  // User[]=[]

  // Sending message
  communication:Communication=new Communication();
  message:string="";

//Message revieved 
  communicationRecieved:Communication=new Communication();
  current=this.user; //this.user; //User
  communityId:number=1;
  
 

ngOnInit(){
  this.service.communityId=1;
  this.connect();
  
}



/*  getAllcomunication(){
    this.service.findysenderAndReciever.Subscribe(mes=>this.Messages=mes)
  }*/



  handleMessage(communication:Communication) {
    communication.sender=this.userList[2];
    this.messages.push(communication);
  }

  connect(){
    this.service._connect();
  }

  disconnect(){
    this.service._disconnect();
    this.subscription.unsubscribe();
  }

  
  sendMessage(/*communication:Communication*/){
    this.communication.sender=this.current;
    var com:Communication=new Communication();
    com.sender=this.current;

    com.message=this.message;
    console.log("houna"+this.message);
    this.messages.push(com);

    console.log(this.messages);
    this.service._send(this.communication);
    
    this.message="";
    console.log(2);
  }


}
