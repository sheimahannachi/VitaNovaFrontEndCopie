import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { LoginComponent } from './front-office/user/login/login.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import {AddexerciseComponent} from "./addExercise/addexercise.component";
import {ExerciseListComponent} from "./exercise-list/exercise-list.component";
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ShowProductUserComponent } from './show-product-user/show-product-user.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  { path: '', component: AllTemplateFrontComponent },
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
    {path:"addProduct",
component: AddProductComponent},
{path:"showProduct",
component: ShowProductComponent},
{ path: 'updateProduct/:id', 
component: UpdateProductComponent },
  ]},

  {path:"showProductUser",
component: ShowProductUserComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes),BrowserModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
