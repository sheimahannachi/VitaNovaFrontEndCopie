import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user.module';
import { PeriodTracker } from './PeriodTracker';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PersonalGoalsModule {

  idPG: number;
  weightGoal: number;
  dateGoal: Date;
  description: string;
  user?: UserModule; // Optional relationship with User model
  //workoutProgramList?: WorkoutProgram[]; // Optional relationship with WorkoutProgram model
  tracker?: PeriodTracker; // Optional relationship with Tracker model

 }
