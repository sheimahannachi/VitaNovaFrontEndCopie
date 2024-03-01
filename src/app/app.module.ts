import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { CommunicationComponent } from './communication/communication.component';
import { CommunityComponent } from './community/community.component';
import { ChallengeComponent } from './challenge/challenge.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
     CommunicationComponent,
    CommunityComponent,
    ChallengeComponent,
    NavbarComponent,
    FooterComponent,
    AllTemplateFrontComponent,
    
    NavBarBackComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
