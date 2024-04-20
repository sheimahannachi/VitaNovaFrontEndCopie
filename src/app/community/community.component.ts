import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { CommunityServiceService } from '../Services/community-service.service';
import { Route, Router } from '@angular/router';
import { Community } from '../Model/Community';
import { UserModule } from '../Model/user/user.module';
import { AuthService } from '../Service/auth.service';

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
    this.communityId=1;
    this.divTest=0;
    this.topThree=[];
    this.currentUser=new UserModule();
    this.currentUser.communities=new Community();

    //Initialised false get it from current if creator or not
    this.amCreator=true;
    this.videoChat=false;
    
    


    // User Connected get Community
  }

  deleteCommunity() {
   this.service.deleteComunity(this.communityId).subscribe(res=>{

    this.router.navigateByUrl("");
   })
    }








ngOnInit(){
  //a revoir apres session...

  this.currentUser.communities.id=this.communityId;


  this.getThisCommunity();

  this.fetchTopThree();
  this.getCurrentUser();


}


getThisCommunity(){
  this.service.getComunity(this.currentUser.communities.id).subscribe(response=>{
    this.community=response;

    this.creatorName=this.community.creator.firstName+" "+this.community.creator.lastName;
  })

}

getCurrentUser(){
 this.userService.getUserInfoFromToken().subscribe(res=>{
  console.log(res.firstName+" cureent aaaaaaaaaaaaa");
 })
}

fetchTopThree(){
  this.service.getTopThreeByCommunity(this.communityId).subscribe(response=>{
    this.topThree=response;
    console.log("top3"+response);
  })
}


leaveCommunity(){

  this.router.navigateByUrl("");
}

increment(value:number){
  return value+1;
}


goToOne(userId: number) {
  this.divTest=userId;
  }


  chatUrl:string='';
  goToVideoChat(url:string){
    this.chatUrl=url;
    console.log(this.chatUrl+" aaaaaaaaaaaa community")
    this.videoChat=true;
    
    
  }


  



}
