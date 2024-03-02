import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';

import { UserComponent } from './front-office/user/user.component';
import { RegisterComponent } from './front-office/user/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './front-office/user/login/login.component';
import { NavBarBackComponent } from './back-office/nav-bar-back/nav-bar-back.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { FooterBackComponent } from './back-office/footer-back/footer-back.component';
import { UsersBackComponent } from './back-office/users-back/users-back.component';
import { SideBarBackComponent } from './back-office/side-bar-back/side-bar-back.component';



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
    UsersBackComponent,
    SideBarBackComponent,
 
    
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
