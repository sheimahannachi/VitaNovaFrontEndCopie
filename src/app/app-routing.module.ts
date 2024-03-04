import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import {FoodComponent} from "./food/food.component";
import {FoodListComponent} from "./food-list/food-list.component";

const routes: Routes = [

{path:"",
component:AllTemplateFrontComponent},

{path:"admin",
component:AllTemplateBackComponent,children:[
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
