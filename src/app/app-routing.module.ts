import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { LoginComponent } from './front-office/user/login/login.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { AddexerciseComponent } from "./addExercise/addexercise.component";
import { ExerciseListComponent } from "./exercise-list/exercise-list.component";
import { UsersBackComponent } from './users-back/users-back.component';
import { UserProfileComponent } from './front-office/user/profile/user-profile/user-profile.component';
const routes: Routes = [
  {
    path: '', component: AllTemplateFrontComponent
  },
  {
    path: "profile", component: UserProfileComponent
  },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AllTemplateBackComponent, children: [
      {
        path: "exercise",
        component: AddexerciseComponent,
      },
      {
        path: "ListExercice",
        component: ExerciseListComponent,

      },
      {
        path: "users",
        component: UsersBackComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
