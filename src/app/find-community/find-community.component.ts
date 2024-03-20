import { Component } from '@angular/core';
import { Community } from '../Model/Community';
import { CommunityServiceService } from '../Services/community-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-community',
  templateUrl: './find-community.component.html',
  styleUrls: ['./find-community.component.css']
})
export class FindCommunityComponent {
communities: Community[];
page:number;
myForm:FormGroup;
whereAmI:number;

constructor(private service:CommunityServiceService){
  this.page=0;
}

ngOnInit(){
  this.myForm=new FormGroup({
    
      communityName: new FormControl('', []),
  });
  this.getAllCommunities();
}

get communityName(){
  return this.myForm.get('communityName');
}



getAllCommunities(){
  this.whereAmI=0;
  this.service.getCommunitiesOrderByChallenge(this.page).subscribe((res)=>{
    this.communities=res.content;

  })

}

getCommunityByName(){
  this.whereAmI=1;
  this.communities=[];
  this.service.getByNomComunity(this.communityName.value,this.page).subscribe(res=>{
    this.communities=res;
  })
}

clickHandles(){
  if(this.communityName.value==''){
    this.getAllCommunities();
  }else{
    this.getCommunityByName();
  }
}



nextPage(){
  this.page++;
  if(this.whereAmI==1){
 
  this.getCommunityByName();}

  if(this.whereAmI==0){

    this.getAllCommunities();
  }

}

previousPage(){
  if(this.page>0){
  this.page--;
  if(this.whereAmI==1){
  this.getCommunityByName();
  }
  if(this.whereAmI==0){

    this.getAllCommunities();
  }
  }
}

}
