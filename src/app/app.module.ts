import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';

import { UserComponent } from './front-office/user/user.component';
import { RegisterComponent } from './front-office/user/register/register.component';

import { LoginComponent } from './front-office/user/login/login.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { SideBarBackComponent } from './back-office/side-bar-back/side-bar-back.component';
import { CommunicationComponent } from './communication/communication.component';
import { CommunityComponent } from './community/community.component';
import { ChallengeComponent } from './challenge/challenge.component';

import { AddexerciseComponent } from './addExercise/addexercise.component';
import {ReactiveFormsModule} from "@angular/forms";
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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { AddCommunityComponent } from './add-community/add-community.component';
import { AllCommunitiesBackComponent } from './all-communities-back/all-communities-back.component';
import { AllChallengesBackComponent } from './all-challenges-back/all-challenges-back.component';
import { FindCommunityComponent } from './find-community/find-community.component';
import { UpdateCommunityComponent } from './update-community/update-community.component';

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
    HttpClientModule
  ],
  exports:[MatDialogModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
