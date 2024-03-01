import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { CommunityComponent } from './community/community.component';

const routes: Routes = [
  {path:"",
  component:AllTemplateFrontComponent,children:[
    {path:"community", component:CommunityComponent}
  ]
},
  
  {path:"admin",
  component:AllTemplateBackComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
