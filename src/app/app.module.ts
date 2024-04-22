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
import { SideBarBackComponent } from './back-office/side-bar-back/side-bar-back.component';

import { AddexerciseComponent } from './addExercise/addexercise.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import {RouterModule} from "@angular/router";
import { AddPlanComponent } from './add-plan/add-plan.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';

import { CommonModule } from '@angular/common';
import { ShowProductUserComponent } from './show-product-user/show-product-user.component';
import { CartComponent } from './cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StripeComponent } from './stripe/stripe.component'; // Import MatDialogModule
import { MatSliderModule } from '@angular/material/slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ng5SliderModule } from 'ng5-slider';






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
    UpdateProductComponent,
    AddProductComponent,
    ShowProductComponent,
    ShowProductUserComponent,
    CartComponent,
    SidebarComponent,
    StripeComponent,
    
    
    
  


    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatSliderModule,
    Ng5SliderModule,

    


  ],
  providers: [],
  bootstrap: [AppComponent],

  
})
export class AppModule { }
