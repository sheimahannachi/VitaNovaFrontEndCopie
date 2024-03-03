import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import {AddexerciseComponent} from "./addExercise/addexercise.component";
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
const routes: Routes = [

{path:"",
component:AllTemplateFrontComponent},

  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "exercise",
        component: AddexerciseComponent,
      },
      {
        path: "ListExercice",
        component: ExerciseListComponent,

      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
