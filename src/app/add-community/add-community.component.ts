import { Component } from '@angular/core';
import { Community } from '../Model/Community';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommunityServiceService } from '../Services/community-service.service';
import { Router } from '@angular/router';
import { UserModule } from '../Model/user/user.module';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.component.html',
  styleUrls: ['./add-community.component.css']
})
export class AddCommunityComponent {
  constructor(private service:CommunityServiceService,private router:Router){
    this.router=router;
  }

  current:UserModule;

  myForm: FormGroup;

  ngOnInit(){
    this.myForm=new FormGroup({
      
        communityName: new FormControl('', [Validators.required]),
        
        description:new FormControl('',[Validators.required]),
     
      
     
    });
  }



    get communityName(){
      return this.myForm.get('communityName');
    }




    get description(){
      return this.myForm.get('description');
    }



    addCommunity(){
      let community = new Community();
      community.communityName=this.communityName.value;
      community.description= this.description.value;
      community.creator=this.current;
      
      this.service.addCommunity(community,1).subscribe(response=>{
        this.myForm.reset();
        this.router.navigateByUrl("/app/home")
        
      },
      error=>{
        console.error('BackEnd error while adding community:',error);
      })
      
    }

}
