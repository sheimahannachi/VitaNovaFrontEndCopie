import { Component, Input } from '@angular/core';
import { CommunicationServiceService } from '../Services/communication-service.service';
import { UserModule } from '../Models/user.module';

@Component({
  selector: 'app-one-to-one-com',
  templateUrl: './one-to-one-com.component.html',
  styleUrls: ['./one-to-one-com.component.css']
})
export class OneToOneComComponent {


  @Input() userId:number;
  
  current:UserModule;
  other:UserModule;
  page:number;
  constructor(private service:CommunicationServiceService){
    this.page=0;

  }

  ngOnInit(){

    this.getCurrentUser();
    this.service.myChannel="U"+this.current.idUser;
  this.service.otherChannel="U"+this.other.idUser;
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
    this.service.findBysenderAndReciever(this.current.idUser,this.other.idUser,this.page)
  }


}
