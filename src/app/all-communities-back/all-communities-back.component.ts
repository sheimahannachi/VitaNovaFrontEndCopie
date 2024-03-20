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
  sizePage:number;
  booltest:boolean
  constructor(private service:CommunityServiceService){
    this.page=0;
    this.sizePage=5;
    this.booltest=false;
  }
  communities:Community[];
  

  ngOnInit(){
    this.getAllCommunities();
  }


  getAllCommunities(){
    this.service.getAllComunity(this.page,this.sizePage).subscribe((res)=>{
      if(res.numberOfElements!=0){
      this.communities=res.content;
      }else{

        this.booltest=true;
      }

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



  pageSize(pageSize:number) {
    this.pageSize(pageSize);
    this.getAllCommunities();
    
    }

}
