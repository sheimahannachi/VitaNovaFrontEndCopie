import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { LoginComponent } from './front-office/user/login/login.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { UsersBackComponent } from './back-office/users-back/users-back.component';
const routes: Routes = [
  { path: '', component: AllTemplateFrontComponent },
  { path: 'signup', component: RegisterComponent } ,
  { path: 'login', component: LoginComponent } ,
{path:'admin',component:AllTemplateBackComponent},
{path:'admin/users',component:UsersBackComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
