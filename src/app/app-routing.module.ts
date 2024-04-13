import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from './front-office/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './back-office/all-template-back/all-template-back.component';
import { PeriodTrackerComponent } from './period-tracker/period-tracker.component';
import {ShowPeriodComponent}from './show-period/show-period.component'
import { PeriodInsightsComponent } from './period-insights/period-insights.component';
import { PeriodRecipesComponent } from './period-recipes/period-recipes.component';
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
{path:'PeriodInsights',component:PeriodInsightsComponent},
{path:'PeriodRecipes', component:PeriodRecipesComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
