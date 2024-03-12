import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';

import { UserComponent } from './front-office/user/user.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './front-office/user/login/login.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { FoodComponent } from './food/food.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FoodListComponent } from './food-list/food-list.component';
import {CommonModule} from "@angular/common";
import { SideBarBackComponent } from './back-office/side-bar-back/side-bar-back.component';

import { AddexerciseComponent } from './addExercise/addexercise.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import {RouterModule} from "@angular/router";
import { AddPlanComponent } from './add-plan/add-plan.component';
import { FoodCardComponent } from './food-card/food-card.component';
import { FoodDetailsComponent } from './food-details/food-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AllTemplateFrontComponent,

    UserComponent,
    RegisterComponent,
    LoginComponent,
    NavBarBackComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    SideBarBackComponent,
    AddexerciseComponent,
    ExerciseListComponent,
    AddPlanComponent,


    FoodComponent,
    FoodListComponent,
    FoodCardComponent,
    FoodDetailsComponent,


    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
