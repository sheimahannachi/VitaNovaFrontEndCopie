import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalGoalsModule } from './personal-goals.module';
import { Community } from '../Model/Community';
import { Food } from './Food';
export enum Gender {
  MALE = 'MAN',
  FEMALE = 'WOMAN'
}

export enum ERole {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}
export enum Plan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { 
  [key: string]: any; // Index signature allowing any string key with any value

  idUser!: number;  // Example initial value
  username!: string ;
  firstName!: string ;
  lastName!: string ;
  dateOfBirth!: Date ; // Example initial value
  gender!: Gender ; // Example initial value
  email!: string ;
  weight!: number ; // Example initial value
  height!: number ; // Example initial value
  password!: string ;
  archive!: boolean ;
  picture!: string ;
  verified!: boolean ;
  score!:number;
  phone!: string ;
  facebook!:string;
   personalGoals: PersonalGoalsModule = null; // Example initial value
  // periodTracker: PeriodTracker = new PeriodTracker(); // Example initial value
  // cart: Cart = new Cart(); // Example initial value
   foods: Food[] = [];
  communities: Community[] = [];
  role!: ERole ; // Example initial value
  plan!: Plan ; // Example initial value

  constructor() {
    
  }

}
