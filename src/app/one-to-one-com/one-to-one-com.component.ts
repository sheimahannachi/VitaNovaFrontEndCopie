import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommunicationServiceService } from '../Services/communication-service.service';
import { UserModule } from '../Model/user/user.module';
import { Communication } from '../Model/Communication';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-one-to-one-com',
  templateUrl: './one-to-one-com.component.html',
  styleUrls: ['./one-to-one-com.component.css']
})
export class OneToOneComComponent {



  @Input() userId:number;
  @Output() messageEvent = new EventEmitter<number>();
  
  current:UserModule;
  other:UserModule;
  page:number;
  messages:Communication[];
  subscription:Subscription;

  message:string;
  constructor(private service:CommunicationServiceService){
    this.page=0;
    this.messages=[];
    this.message="";

  }

  ngOnInit(){

    this.getCurrentUser();
    this.service.myChannel="U"+this.current.idUser;
  this.service.otherChannel="U"+this.other.idUser;

  this.subscription=this.service.fonctionAppelee.subscribe((comunication:Communication)=>{
    if(comunication.sender!=null && comunication.reciever!=null){
      if((comunication.sender.idUser==this.current.idUser&&comunication.reciever.idUser==this.other.idUser)
        ||(comunication.reciever.idUser==this.current.idUser&&comunication.sender.idUser==this.other.idUser))
    this.handleMessage(comunication);
  }
    
  })
  }

  getCurrentUser(){
    //user method
  }

  connect(){
    this.service._connect();
  }
  disconnect(){
    this.service._disconnect();

  }

  getCommunicationsByUsers(){
    this.service.findBysenderAndReciever(this.current.idUser,this.other.idUser,this.page).subscribe(response=>{
      if(this.messages.length==0){
        this.messages=response.content.reverse();
        /*setTimeout(() => {
          this.scrollToBottom();
        }, 10);*/
      }
      else{
        this.messages=response.content.reverse().concat(this.messages)
      }

    })
  }
  

  pagePlus(){
    this.page++;
    this.getCommunicationsByUsers();
  }

  /*
  scrollToBottom(){
    const element = this.htmlMessages.nativeElement;
    element.scrollTop=element.scrollHeight;
}
*/

handleMessage(communication:Communication) {
  console.log("reee:: "+communication.message)
  this.messages.push(communication);
  console.log(this.messages)
  /*setTimeout(() => {
    this.scrollToBottom();
  }, 10);*/
}

sendMessage(){
  var  com:Communication=new Communication();
  com.sender=this.current;
  
  
  com.message=this.message;
  
  

  this.service._send(com);
  
  this.message="";
  
  
  
}

seenMessages(){
      
  this.service.setSeenCommunicationOneToOne(this.other.idUser,this.current.idUser).subscribe(res=>{
    console.log("Server response to Seen:: "+res)
  });

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
goToCommunityChat() {
  this.messageEvent.emit(0);
  this.disconnect();
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

}
