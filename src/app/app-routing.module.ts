import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { LoginComponent } from './front-office/user/login/login.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import {AddexerciseComponent} from "./addExercise/addexercise.component";
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
import { CommunityComponent } from './community/community.component';
import { HomeComponent } from './home/home.component';
import { AddCommunityComponent } from './add-community/add-community.component';
import { AllCommunitiesBackComponent } from './all-communities-back/all-communities-back.component';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { AllChallengesBackComponent } from './all-challenges-back/all-challenges-back.component';
const routes: Routes = [
  {path:"",redirectTo:"/app/home",pathMatch:'full'},

  {path:"app",
  component:AllTemplateFrontComponent,children:[
    {path:"home",component:HomeComponent},
    {path:"community", component:CommunityComponent,children:[
      {path:"addChallenge", component:AddChallengeComponent},
    ]},
    {path:"addCommunity",component:AddCommunityComponent},
    

    


  ]
},


{ path: 'signup', component: RegisterComponent } ,
{ path: 'login', component: LoginComponent } ,

{path:'admin',component:AllTemplateBackComponent, children: [
  {
    path: "exercise",
    component: AddexerciseComponent,
  },
  {
    path: "ListExercice",
    component: ExerciseListComponent,

  },
  {path:"communities",component:AllCommunitiesBackComponent},
  {path:"chalenges", component:AllChallengesBackComponent}
  
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
