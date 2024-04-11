import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { CommunicationServiceService } from '../Services/communication-service.service';



import { Subscription } from 'rxjs';
import { Communication } from '../Model/Communication';
import { ERole, Gender, UserModule } from '../Model/user/user.module';
import { DateAdapter } from '@angular/material/core';
import { Community } from '../Model/Community';
import { CommunityServiceService } from '../Services/community-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements AfterViewInit {
 


  @ViewChild('messagesList') htmlMessages:ElementRef; 
  @Input() idFromParent:number;
  @Input() communityMembers:UserModule[];
  @Output() messageEvent = new EventEmitter<number>();
  
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
goToOne:number;

constructor(private service:CommunicationServiceService,private comService:CommunityServiceService ){

    this.subscription=this.service.fonctionAppelee.subscribe((comunication:Communication)=>{
      this.handleMessage(comunication);
      
    })

    this.page=0;
    this.members=[];
    this.goToOne=0;
    
   

  }
  ngAfterViewInit(): void {
  
    this.scrollToBottom();
  }

  scrollToBottom(){
    
    
      const element = this.htmlMessages.nativeElement;
      element.scrollTop=element.scrollHeight;
      
      
    
  }



  pagePlus() {
    this.page=this.page+1;
    this.getAllCommunicationByCommunity();
    }







 

ngOnInit(){

  this.communityId=this.idFromParent;
  this.service.myChannel="C"+this.communityId;
  this.service.otherChannel="C"+this.communityId;
  this.community.id=this.communityId;

 
  this.connect();
  this.getAllCommunicationByCommunity();
  this.getMembres();
  
  
}





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
    console.log("reee:: "+communication.message)
    this.messages.push(communication);
    console.log(this.messages)
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



  elToTextArea:boolean=false;
  updateCom:number=0;
  
  updateHtml(comId: number) {
   
    
    this.elToTextArea=true;
    this.updateCom=comId;

    
    }




    deleteHtml(comId:number){
      const index = this.messages.findIndex(message => message.id === comId);
      if (index !== -1) {
        this.messages.splice(index, 1);
      }
      this.service.deleteCommunication(comId).subscribe(res=>{
        console.log('Communication deleted:: '+comId);
        
        
      },
      error=>{
        console.error(error)
      });
     

    }

    cancelUpdate(){
      this.elToTextArea=false;
      this.updateCom=0;
    }
    updateMessage(com:Communication,value:string){
      const index = this.messages.findIndex(message => message.id === com.id);
      com.message=value;

      
      if (index !== -1) { 
        com.community=this.community
        this.messages[index]=com;
      }

      this.service.updateCommunication(com,com.id).subscribe(res=>{
        console.log("Communication Updated ::"+com.id);
        this.elToTextArea=false;
        this.updateCom=0;
      },error=>{
        console.log("Backend Error:: "+error);
        this.elToTextArea=false;
        this.updateCom=0;
      })


    }

    seenMessages(){
      this.service.seenComunication(this.communityId,this.current.idUser).subscribe();

      this.messages.forEach(communication=>{
        if(communication.sender.idUser!=this.current.idUser){
        communication.seen=true;
        }
      })
    }
    activeSeen(){
      this.seenMessages();
    }

    ngOnDestroy(){
      this.service._disconnect();
    }


    
    goToOneToOne(userId:number) {
      this.messageEvent.emit(userId);
      this.disconnect();
      }


}
