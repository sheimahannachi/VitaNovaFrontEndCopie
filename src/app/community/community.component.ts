import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { CommunityServiceService } from '../Services/community-service.service';
import { Route, Router } from '@angular/router';
import { Community } from '../Model/Community';
import { UserModule } from '../Model/user/user.module';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {

  communityId:number;
  divTest:number;
  community:Community;
  currentUser:UserModule;
  creatorName:string;
  topThree:UserModule[]
  amCreator:boolean;
  test:number;
  members:UserModule[];


  constructor(private service:CommunityServiceService,private router:Router)
  {
    this.communityId=1;
    this.divTest=0;
    this.topThree=[];
    this.currentUser=new UserModule();
    this.currentUser.communities=new Community();

    //Initialised false get it from current if creator or not
    this.amCreator=false;
    this.test=0;


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


}


getThisCommunity(){
  this.service.getComunity(this.currentUser.communities.id).subscribe(response=>{
    this.community=response;

    this.creatorName=this.community.creator.firstName+" "+this.community.creator.lastName;
  })

}

getCurrentUser(){
  //Call service for current user !!
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



}
