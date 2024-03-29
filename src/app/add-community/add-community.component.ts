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
  current:UserModule;
  error:string;

  constructor(private service:CommunityServiceService,private router:Router){
    this.router=router;
    this.current=new UserModule();
    this.current.idUser=2;
    this.error="";
  }

  

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
      community.creationDate=new Date();
      community.status=true;
      
      
      this.service.addCommunity(community,this.current.idUser).subscribe(response=>{
        this.myForm.reset();
        this.router.navigateByUrl("/app/home")
        
      },
      error=>{
        console.error('BackEnd error while adding community:',error);

        if (error && error.error && Object.keys(error.error).length > 1) {
          // Accédez à la deuxième erreur
          const secondError = Object.values(error.error)[1];
          this.error=secondError.toString();
          
        } else {
          console.log('Aucune deuxième erreur trouvée.');
        }
      })
      
    }

    clearError(){
      this.error="";
    }

}
