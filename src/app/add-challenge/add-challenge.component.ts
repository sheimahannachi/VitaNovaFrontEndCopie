import { Component } from '@angular/core';
import { ChallengesService } from '../Services/challenges.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ChallengeType, Challenges } from '../Model/Challenges';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.css']
})
export class AddChallengeComponent {

  challengeType=ChallengeType;
  communityId:number;
  object=Object;

  constructor(private service:ChallengesService,private router:Router,private ac:ActivatedRoute){}

  myForm: FormGroup;
  enumValidator(enumType: any): ValidatorFn {
    return (control: FormControl): {[key: string]: any} | null => {
      const valid = Object.values(enumType).includes(control.value);
      return valid ? null : { 'invalidEnumValue': { value: control.value } };
    };
  }

  ngOnInit(){
    this.myForm=new FormGroup({
      
        name: new FormControl('', [Validators.required]),
        
        description:new FormControl('',[Validators.required]),
        goal:new FormControl('',[Validators.required,Validators.pattern(/^\d+$/), Validators.min(0)]),
        type:new FormControl('',[Validators.required,this.enumValidator(ChallengeType)])
     
       
    });
    this.communityId=parseInt( this.ac.snapshot.paramMap.get('id'));
  }

  get name(){
    return this.myForm.get('name');
  }

  get description(){
    return this.myForm.get('description');
  }

  get goal(){
    return this.myForm.get('goal');
  }

  get type(){
    return this.myForm.get('type');
  }



  saveChallenge(){
    let challenge =new Challenges();

    challenge.name=this.name.value;
    challenge.description=this.description.value;
    challenge.goal=this.goal.value;
    challenge.type=this.type.value
    this.service.addChallenge(challenge,1).subscribe(res=>this.router.navigateByUrl('/app/community'));
  }
  //this.communityId
}
