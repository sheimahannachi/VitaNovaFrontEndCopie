import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { LoginComponent } from './front-office/user/login/login.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import {FoodComponent} from "./food/food.component";
import {FoodListComponent} from "./food-list/food-list.component";

import {AddexerciseComponent} from "./addExercise/addexercise.component";
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
//yoser

import {FoodCardComponent} from "./food-card/food-card.component";
import {FoodDetailsComponent} from "./food-details/food-details.component";
import {ExerciseListFrontComponent} from "./exercise-list-front/exercise-list-front.component";
import {ExerciseModalComponent} from "./exercise-modal/exercise-modal.component";
import {ExerciseDetailsComponent} from "./exercise-details/exercise-details.component";
import {GetPlanUserComponent} from "./get-plan-user/get-plan-user.component";
import {TimerPageComponent} from "./timer-page/timer-page.component";

//firas
import { CommunityComponent } from './community/community.component';
import { HomeComponent } from './home/home.component';
import { AddCommunityComponent } from './add-community/add-community.component';
import { AllCommunitiesBackComponent } from './all-communities-back/all-communities-back.component';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { AllChallengesBackComponent } from './all-challenges-back/all-challenges-back.component';
import { FindCommunityComponent } from './find-community/find-community.component';
import { UpdateCommunityComponent } from './update-community/update-community.component';

//Amine
import { UsersBackComponent } from './users-back/users-back.component';
import { UserProfileComponent } from './front-office/user/profile/user-profile/user-profile.component';

import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ShowProductUserComponent } from './show-product-user/show-product-user.component';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//sheima
import { PeriodTrackerComponent } from './period-tracker/period-tracker.component';
import {ShowPeriodComponent}from './show-period/show-period.component'
import { PeriodInsightsComponent } from './period-insights/period-insights.component';
import { PeriodRecipesComponent } from './period-recipes/period-recipes.component';

import { CartComponent } from './cart/cart.component';
const routes: Routes = [

  {path:"",redirectTo:"/vitaNova/home",pathMatch:'full'},
  {path:"vitaNova",redirectTo:"/vitaNova/home",pathMatch:'full'},

  { path:"vitaNova",
    component:AllTemplateFrontComponent,children:[
      {path:"home",component:HomeComponent},
      {path: "profile", component: UserProfileComponent},
      //firas
      {path:"community", component:CommunityComponent,children:[
          {path:"addChallenge/:id", component:AddChallengeComponent},
        ]},
      {path:"addCommunity",component:AddCommunityComponent},
      {path:"findCommunity",component:FindCommunityComponent},
      {path:"updateCommunity/:id",component:UpdateCommunityComponent},
      //yoser
      {path: "exerciseworkout",component:ExerciseListFrontComponent},
      {path:"exercises/:exerciseId",component:ExerciseDetailsComponent},
      {path:"workoutplan",component:GetPlanUserComponent},
      { path: 'timer/:id', component: TimerPageComponent },
      {path:"foodFront",component:FoodCardComponent},
      { path: 'foodDetails/:id', component: FoodDetailsComponent },

      //aziz
      {path:"showProductUser",
        component: ShowProductUserComponent},
        {path:"Cart",
               component: CartComponent},
      //sheima
      {path:"PeriodInformation",
        component:PeriodTrackerComponent},
      {path:"ShowPeriodInformation",
        component:ShowPeriodComponent},
      { path: 'PeriodInformation/:idPeriod', component: PeriodTrackerComponent },
      {path:'PeriodInsights',component:PeriodInsightsComponent},
      {path:'PeriodRecipes', component:PeriodRecipesComponent}
    ]},
//amine

  { path: 'signup', component: RegisterComponent } ,
  { path: 'login', component: LoginComponent } ,


//Admin
  { path:'admin',component:AllTemplateBackComponent, children: [
      //yoser
      {
        path:"addFood",
        component:FoodComponent,
      },
      {
        path: 'addFood/:id',
        component: FoodComponent // or whichever component you want to navigate to
      },
  
      {
        path:"getFoods",
        component:FoodListComponent,
      },
      {
        path: "listex",
        component: ExerciseListComponent,
  
      },
      {
        path: "exercise",
        component: AddexerciseComponent,
      },
  
      //firas
      {path:"communities",component:AllCommunitiesBackComponent},
      {path:"chalenges", component:AllChallengesBackComponent},
      //amine
      
      {
        path: "users",
        component: UsersBackComponent
      },
      //aziz
      {path:"addProduct",
        component: AddProductComponent},
      {path:"showProduct",
        component: ShowProductComponent},
      { path: 'updateProduct/:id',
        component: UpdateProductComponent },]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
