import { Component } from '@angular/core';
import {WorkoutService} from "../Service/workout.service";
import {WorkoutPlan} from "../Models/WorkoutPlan";
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-plan-user',
  templateUrl: './get-plan-user.component.html',
  styleUrls: ['./get-plan-user.component.css']
})
export class GetPlanUserComponent {
  workoutPlan:WorkoutPlan[]=[];
  baseUrl: string = 'http://localhost:80/uploads/';
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  constructor(private workoutService: WorkoutService,private router:Router) { }

  ngOnInit(): void {
    this.getWorkoutPlan(0,10);
  }

  getWorkoutPlan(page: number, size: number): void {
    this.workoutService.getWorkoutPlan(page, size)
      .subscribe((pageData: any) => {
        if (Array.isArray(pageData.content)) {
          this.workoutPlan = pageData.content;
          this.totalElements = pageData.totalElements;
          this.totalPages = pageData.totalPages;
          this.currentPage = pageData.number;
          // Sanitize image URLs
          this.workoutPlan.forEach(plan => {
            plan.image = this.baseUrl + plan.image;
          });
        } else {
          console.error("Received data is not an array:", pageData.content);
        }
      });
  }


  openTimer(plan: WorkoutPlan): void {
    // Navigate to another route or open a dialog containing the timer and exercise details
    this.router.navigate(['/timer', plan.id]);
  }

}
