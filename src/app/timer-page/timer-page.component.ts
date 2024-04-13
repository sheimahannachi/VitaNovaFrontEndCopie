import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutService } from '../Service/workout.service';
import { WorkoutPlan } from '../Models/WorkoutPlan';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.css']
})
export class TimerPageComponent implements OnInit {
  workoutPlan: WorkoutPlan | null = null;
  remainingTime: number | null = null;
  timerInterval: any;
  currentSet: number = 0;
  currentInterval: 'exercise' | 'rest' = 'exercise';
  currentExerciseIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getWorkoutPlan(parseInt(id, 10));
      }
    });
  }

  getWorkoutPlan(id: number): void {
    this.workoutService.getWorkoutPlanById(id).subscribe(plan => {
      this.workoutPlan = plan;
      // Start timer with first exercise
      this.startNextSet();
    });
  }

  startNextSet(): void {
    if (this.workoutPlan && this.currentExerciseIndex < this.workoutPlan.exercises.length) {
      const currentExercise = this.workoutPlan.exercises[this.currentExerciseIndex];
      if (this.currentSet < parseInt(currentExercise.sets.split('-')[1])) {
        if (this.currentInterval === 'exercise') {
          // Exercise duration is 1 minute
          this.remainingTime = 60;
        } else {
          // Rest duration is 45 seconds
          this.remainingTime = 45;
        }
        this.timerInterval = setInterval(() => {
          if (this.remainingTime && this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            clearInterval(this.timerInterval);
            // Switch to the next interval (exercise/rest)
            this.currentInterval = this.currentInterval === 'exercise' ? 'rest' : 'exercise';
            // Check if all sets for the current exercise are completed
            if (this.currentInterval === 'exercise') {
              this.currentSet++;
              // Start timer for the next set
              this.startNextSet();
            } else {
              // Start timer for the rest interval
              this.startNextSet();
            }
          }
        }, 1000);
      } else {
        // Move to the next exercise
        this.currentSet = 0;
        this.currentExerciseIndex++;
        // Start timer for rest interval between exercises
        this.remainingTime = 60;
        this.timerInterval = setInterval(() => {
          if (this.remainingTime && this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            clearInterval(this.timerInterval);
            // Start timer for the next exercise
            this.startNextSet();
          }
        }, 1000);
      }
    }
  }

  startTimer(): void {
    if (!this.timerInterval) {
      this.startNextSet();
    }
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
  }

  isExerciseCompleted(exerciseIndex: number): boolean {
    return exerciseIndex < this.currentExerciseIndex;
  }
}
