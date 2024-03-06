import { Component } from '@angular/core';
import { CommunityServiceService } from '../Services/community-service.service';
import { Community } from '../Model/Community';

@Component({
  selector: 'app-all-communities-back',
  templateUrl: './all-communities-back.component.html',
  styleUrls: ['./all-communities-back.component.css']
})
export class AllCommunitiesBackComponent {
  constructor(private service:CommunityServiceService){}
  communities:Community[];

  ngOnInit(){
    this.service.getAllComunity().subscribe((res)=>{
      this.communities=res;

    })
  }

}
