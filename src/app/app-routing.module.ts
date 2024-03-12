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
import {FoodCardComponent} from "./food-card/food-card.component";
import {FoodDetailsComponent} from "./food-details/food-details.component";
const routes: Routes = [
  { path: '', component: AllTemplateFrontComponent },
  { path: 'signup', component: RegisterComponent } ,
  { path: 'login', component: LoginComponent } ,
  {path:"foodFront",component:FoodCardComponent},
  { path: 'foodDetails/:id', component: FoodDetailsComponent },
{path:'admin',component:AllTemplateBackComponent, children: [
    {
      path: "exercise",
      component: AddexerciseComponent,
    },
    {
      path: "ListExercice",
      component: ExerciseListComponent,
    },
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
    }
  ]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
