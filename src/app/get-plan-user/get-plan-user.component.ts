import { Component } from '@angular/core';
import {WorkoutService} from "../Service/workout.service";
import {WorkoutPlan} from "../Models/WorkoutPlan";
import { Router } from '@angular/router';
import {Exercise} from "../Models/Exercise";



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
  workoutIdToDelete: number | null = null;
  workoutId: number | null = null; // Define workoutId variable


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

  deleteWorkout(event: Event, plan: WorkoutPlan): void {
    event.stopPropagation(); // Stop event propagation
    const confirmationMessage = plan.archived
      ? 'Are you sure you want to unarchive this exercise? Title: ' + plan.title
      : 'Are you sure you want to archive this exercise? Title: ' + plan.title;

    if (confirm(confirmationMessage)) {
      // Toggle the archived status
      plan.archived = !plan.archived;

      // Update the archived status on the server
      this.workoutService.deleteWorkout(plan.id).subscribe(
        () => {
          if (plan.archived) {
            this.showAlert('Exercise archived successfully.', 'alert-success');
          } else {
            this.showAlert('Exercise unarchived successfully.', 'alert-success');
          }

          // Remove the deleted workout from the workoutPlan array
          this.workoutPlan = this.workoutPlan.filter(item => item.id !== plan.id);
        },
        (error) => {
          console.error('Error updating exercise:', error);
          this.showAlert('Failed to update exercise status.', 'alert-danger');
          // Revert the toggle if the update fails
          plan.archived = !plan.archived;
        }
      );
    }
  }




  private showAlert(exerciseArchivedSuccessfully: string, alertSuccess: string) {

  }
}
