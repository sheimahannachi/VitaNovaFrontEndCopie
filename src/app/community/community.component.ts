import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { CommunityServiceService } from '../Services/community-service.service';
import { Route, Router } from '@angular/router';
import { Community } from '../Model/Community';

import { AuthService } from '../Service/auth.service';
import { UserModule } from '../Models/user.module';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {

  
  videoChat:boolean;
  

  communityId:number;
  divTest:number;
  community:Community;
  currentUser:UserModule;
  creatorName:string;
  topThree:UserModule[]
  amCreator:boolean;
  
  members:UserModule[];


  constructor(private service:CommunityServiceService,private router:Router,private userService:AuthService)
  {
    this.communityId=0;
    this.divTest=null;
    this.topThree=[];
    this.currentUser=new UserModule();
    this.currentUser.communities=new Community();

    //Initialised false get it from current if creator or not
    this.amCreator=false;
    this.videoChat=false;
    
    


    // User Connected get Community
  }

  deleteCommunity() {
   this.service.deleteComunity(this.communityId).subscribe(res=>{

    this.router.navigateByUrl("");
   })
    }








ngOnInit(){
  

  this.currentUser.communities.id=this.communityId;


  this.getCurrentUser();

  
  
  


}


getThisCommunity(){
 /* this.service.getComunity(this.communityId)*/
 this.service.getCommunityByUser(this.currentUser.idUser).subscribe(response=>{
  
    this.community=response;
    this.amCreator=this.currentUser.idUser==this.community.creator.idUser;
    

    this.creatorName=this.community.creator.firstName+" "+this.community.creator.lastName;
    this.fetchTopThree();
  },
error=>{
  console.error(error);
})

}

getCurrentUser(){
 this.userService.getUserInfoFromToken().subscribe(res=>{
  this.currentUser=res;
  
  
  
  this.getThisCommunity();
 })
}

fetchTopThree(){
  this.service.getTopThreeByCommunity(this.community.id).subscribe(response=>{
    this.topThree=response;
    this.divTest=0;
  })
}


leaveCommunity(){
  console.log(this.currentUser.idUser+"id id id")
  this.service.userLeaveCommunity(this.currentUser.idUser,this.community.id).subscribe(res=>{
    this.router.navigateByUrl("");
  })
  
}

increment(value:number){
  return value+1;
}

userToPass:UserModule=new UserModule();
goToOne(user: UserModule) {
  this.divTest=user.idUser;
  this.userToPass=user;

  }


  chatUrl:string='';
  goToVideoChat(url:string){
    this.chatUrl=url;
    
    this.videoChat=true;
    
    
  }


  



}
