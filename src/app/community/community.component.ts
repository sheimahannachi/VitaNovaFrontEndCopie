import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';
import { CommunityServiceService } from '../Services/community-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  communityId:number;
  divTest:boolean;

  constructor(private service:CommunityServiceService,private router:Router)
  {
    this.communityId=1;
    this.divTest=true;
    // User Connected get Community 
  }

  deleteCommunity() {
   this.service.deleteComunity(this.communityId).subscribe(res=>{

    this.router.navigateByUrl("");
   })
    }



ClasseName="";
creatorName="";

test:number;

ngOnInit(){
  
  this.test=1;

}
/*
openAddChallenge() {

  
  this.dailog.open(AddChallengeComponent,{
    data:this.communityId
  })
  }
 */

}
