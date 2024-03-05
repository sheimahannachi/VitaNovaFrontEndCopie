import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { PeriodTrackerComponent } from './period-tracker/period-tracker.component';
import {ShowPeriodComponent}from './show-period/show-period.component'

const routes: Routes = [

{path:"",
component:AllTemplateFrontComponent},

{path:"admin",
component:AllTemplateBackComponent},
{path:"PeriodInformation",
component:PeriodTrackerComponent},
{path:"ShowPeriodInformation",
component:ShowPeriodComponent},
{ path: 'PeriodInformation/:idPeriod', component: PeriodTrackerComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
