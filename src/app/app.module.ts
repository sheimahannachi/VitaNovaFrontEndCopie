import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';

import { UserComponent } from './front-office/user/user.component';
import { RegisterComponent } from './front-office/user/register/register.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './front-office/user/login/login.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { SideBarBackComponent } from './back-office/side-bar-back/side-bar-back.component';
import { CommunicationComponent } from './communication/communication.component';
import { CommunityComponent } from './community/community.component';
import { ChallengeComponent } from './challenge/challenge.component';

import { AddexerciseComponent } from './addExercise/addexercise.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import {RouterModule} from "@angular/router";
import { AddPlanComponent } from './add-plan/add-plan.component';

//yoser
import {CommonModule} from "@angular/common";
import { ExerciseListFrontComponent } from './exercise-list-front/exercise-list-front.component';
import { ExerciseModalComponent } from './exercise-modal/exercise-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { ExerciseLinkModelComponent } from './exercise-link-model/exercise-link-model.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
//firas
import { HomeComponent } from './home/home.component';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { AddCommunityComponent } from './add-community/add-community.component';
import { AllCommunitiesBackComponent } from './all-communities-back/all-communities-back.component';
import { AllChallengesBackComponent } from './all-challenges-back/all-challenges-back.component';
import { FindCommunityComponent } from './find-community/find-community.component';
import { UpdateCommunityComponent } from './update-community/update-community.component';
//Amine
import { UsersBackComponent } from './users-back/users-back.component';
import { UserProfileComponent } from './front-office/user/profile/user-profile/user-profile.component';



import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductComponent } from './show-product/show-product.component';


import { ShowProductUserComponent } from './show-product-user/show-product-user.component';
import { CartComponent } from './cart/cart.component';

//sheima
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeriodTrackerComponent } from './period-tracker/period-tracker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ShowPeriodComponent } from './show-period/show-period.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PeriodInsightsComponent } from './period-insights/period-insights.component';
import { OneToOneComComponent } from './one-to-one-com/one-to-one-com.component';
import { VideoChatComponent } from './video-chat/video-chat.component';

@NgModule({
  declarations: [
    AppComponent,
     CommunicationComponent,
    CommunityComponent,
    ChallengeComponent,
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
//yoser
    ExerciseListFrontComponent,
    ExerciseModalComponent,
    ExerciseLinkModelComponent,
    ExerciseDetailsComponent,
//firas
    HomeComponent,
    AddChallengeComponent,
    AddCommunityComponent,
    AllCommunitiesBackComponent,
    AllChallengesBackComponent,
    FindCommunityComponent,
    UpdateCommunityComponent,
//Amine
    UsersBackComponent,
    UserProfileComponent,

    UpdateProductComponent,
    AddProductComponent,
    ShowProductComponent,
    ShowProductUserComponent,
    CartComponent,
    //sheima
    NavBarBackComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    PeriodTrackerComponent,
    ShowPeriodComponent,
    CalendarComponent,
    PeriodInsightsComponent,
    OneToOneComComponent,
    VideoChatComponent,





    ],
    entryComponents:[AddChallengeComponent],


  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,

//yoser
    CommonModule,
    MatDialogModule,
    MatIconModule,
//firas
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //sheima
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,


  ],
  exports:[MatDialogModule,],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],

  

 
  bootstrap: [AppComponent]
})
export class AppModule { }
