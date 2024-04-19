import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { WorkoutPlan } from '../Models/WorkoutPlan';
import { WorkoutService } from '../Service/workout.service';
import {workoutapi} from "../Models/workoutapi";
import axios from 'axios';

@Component({
  selector: 'app-get-plan-user',
  templateUrl: './get-plan-user.component.html',
  styleUrls: ['./get-plan-user.component.css']
})
export class GetPlanUserComponent {
  workoutPlan: WorkoutPlan[] = [];
  baseUrl: string = 'http://localhost:80/uploads/';
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  workoutIdToDelete: number | null = null;
  workoutId: number | null = null;
  workoutPlans: any[] = [];
  selectedMuscle: string = '';
  selectedEquipment: string = '';
  selectedIntensity: string = '';

  isLoading: boolean = false;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getWorkoutPlan(0, 10); // Fetch user-created workout plans
    // Fetch workout plans from the API
    this.fetchWorkoutPlans();
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
    console.log("Plan ID:", plan.id);
    // Navigate to another route or open a dialog containing the timer and exercise details
    this.router.navigate(['/vitaNova/Timer', plan.id]).then(r => true);
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
    // Implement your alert logic here
  }

  async fetchWorkoutPlans(): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://work-out-api1.p.rapidapi.com/search',
      headers: {
        'X-RapidAPI-Key': '2acd7d6738mshdd85e14333aac07p11cf80jsn94660876c278',
        'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log('API Response:', response.data);
      this.workoutPlans = response.data.map((plan: any) => ({
        muscle: plan.Muscles,
        workout: plan.WorkOut,
        intensityLevel: plan.Intensity_Level,
        beginnerSets: plan['Beginner Sets'],
        intermediateSets: plan['Intermediate Sets'],
        expertSets: plan['Expert Sets'],
        beginnerReps: plan['Beginner Reps'],
        intermediateReps: plan['Intermediate Reps'],
        expertReps: plan['Expert Reps'],
        breaks: plan.Breaks,
        equipment: plan.Equipments,
        explanation: plan.Explaination
      }));

      console.log('Mapped Workout Plans:', this.workoutPlans);
    } catch (error) {
      console.error('Error fetching workout plans:', error);
      this.workoutPlans = [];
    }
  }

  // Method to filter workout plans by muscle category
  filteredWorkoutPlans(category: string): any[] {
    return this.workoutPlans.filter(plan => plan.muscle === category);
  }

  // Method to extract unique muscle categories from the list of plans
  get uniqueMuscleCategories(): string[] {
    return [...new Set(this.workoutPlans.map(plan => plan.muscle))];
  }

  scrollLeft(): void {
    const scrollContainer = document.querySelector('.scroll-images');
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  }

  scrollRight(): void {
    const scrollContainer = document.querySelector('.scroll-images');
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  }

  async applyFilters(): Promise<void> {
    const options = {
      method: 'GET',
      url: 'https://work-out-api1.p.rapidapi.com/search',
      params: {},
      headers: {
        'X-RapidAPI-Key': '2acd7d6738mshdd85e14333aac07p11cf80jsn94660876c278',
        'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
      }
    };

    // Add selected filters to the request parameters
    if (this.selectedMuscle) {
      options.params['Muscles'] = this.selectedMuscle;
    }
    if (this.selectedEquipment) {
      options.params['Equipments'] = this.selectedEquipment;
    }
    if (this.selectedIntensity) {
      options.params['Intensity_Level'] = this.selectedIntensity;
    }

    try {
      const response = await axios.request(options);
      console.log('Filtered API Response:', response.data);
      // Update the workoutPlans array with the filtered data
      this.workoutPlans = response.data.map((plan: any) => ({
        muscle: plan.Muscles,
        workout: plan.WorkOut,
        intensityLevel: plan.Intensity_Level,
        beginnerSets: plan['Beginner Sets'],
        intermediateSets: plan['Intermediate Sets'],
        expertSets: plan['Expert Sets'],
        beginnerReps: plan['Beginner Reps'],
        intermediateReps: plan['Intermediate Reps'],
        expertReps: plan['Expert Reps'],
        breaks: plan.Breaks,
        equipment: plan.Equipments,
        explanation: plan.Explaination
      }));
    } catch (error) {
      console.error('Error fetching filtered workout plans:', error);
      this.workoutPlans = []; // Clear plans if an error occurs
    }
  }
}
