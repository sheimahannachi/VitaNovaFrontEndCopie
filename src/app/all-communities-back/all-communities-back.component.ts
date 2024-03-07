import { Component } from '@angular/core';
import { CommunityServiceService } from '../Services/community-service.service';
import { Community } from '../Model/Community';

@Component({
  selector: 'app-all-communities-back',
  templateUrl: './all-communities-back.component.html',
  styleUrls: ['./all-communities-back.component.css']
})
export class AllCommunitiesBackComponent {

  page:number;
  constructor(private service:CommunityServiceService){
    this.page=0;
  }
  communities:Community[];
  

  ngOnInit(){
    this.getAllCommunities();
  }


  getAllCommunities(){
    this.service.getAllComunity(this.page).subscribe((res)=>{
      this.communities=res.content;

    })

  }



  nextPage(){
    this.page++;
    this.getAllCommunities();
  }

  previousPage(){
    if(this.page>0){
    this.page--;
    this.getAllCommunities();
    }
  }

}
