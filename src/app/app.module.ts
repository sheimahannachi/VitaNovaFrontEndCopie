import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { AddexerciseComponent } from './addExercise/addexercise.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AllTemplateFrontComponent,

    NavBarBackComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    AddexerciseComponent,
    ExerciseListComponent,


    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
