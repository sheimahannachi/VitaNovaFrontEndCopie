import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddChallengeComponent } from '../add-challenge/add-challenge.component';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  constructor(private dailog: MatDialog)
  {
    // User Connected get Community 
  }




ClasseName="";
creatorName="";
communityId:number;
test:number;

ngOnInit(){
  this.communityId=1
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
