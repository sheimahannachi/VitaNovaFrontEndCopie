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
  currentExerciseImage: string | null = null;
  baseUrl: string = 'http://localhost:80/uploads/';
  timerClass: string = 'base-timer__path-remaining';
  COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: 10 // Adjust as needed
    },
    alert: {
      color: "red",
      threshold: 5 // Adjust as needed
    }
  };
  // Define WARNING_THRESHOLD and ALERT_THRESHOLD properties
  WARNING_THRESHOLD: number = 10; // Set your desired threshold values
  ALERT_THRESHOLD: number = 5;

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
    });
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    // Store the remaining time when stopping the timer
    if (this.remainingTime !== null) {
      this.getTimerClass();
    }
    this.timerInterval = null;
  }

  startTimer(): void {
    if (!this.timerInterval) {
      this.loadCurrentExerciseImage(); // Load image here

      // Start the timer with the remaining time if it exists
      if (this.remainingTime !== null) {
        this.startNextSet(this.remainingTime);
      } else {
        this.startNextSet();
      }
    }
  }

  resetTimer(): void {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.remainingTime = null;
    this.currentSet = 0;
    this.currentInterval = 'exercise';
    this.currentExerciseIndex = 0;
  }

  startNextSet(remainingTime?: number): void {
    if (this.workoutPlan && this.currentExerciseIndex < this.workoutPlan.exercises.length) {
      const currentExercise = this.workoutPlan.exercises[this.currentExerciseIndex];
      const totalSets = parseInt(currentExercise.sets.split('-')[1]);

      if (this.currentSet < totalSets) {
        const duration = this.currentInterval === 'exercise' ? 20 : 15; // Exercise duration is 1 minute, rest duration is 45 seconds
        this.remainingTime = remainingTime !== undefined ? remainingTime : duration;

        this.timerInterval = setInterval(() => {
          if (this.remainingTime && this.remainingTime > 0) {
            this.remainingTime--;
            this.getTimerClass();

          } else {
            clearInterval(this.timerInterval);
            // Switch to the next interval (exercise/rest)
            this.currentInterval = this.currentInterval === 'exercise' ? 'rest' : 'exercise';

            if (this.currentInterval === 'exercise') {
              this.currentSet++;
            } else {
              // Move to the next exercise if all sets are completed
              if (this.currentSet === totalSets) {
                this.currentSet = 0;
                this.currentExerciseIndex++;
                // Load the image for the next exercise
                this.loadCurrentExerciseImage(); // Load image here
              }
            }

            // Set the duration for the next interval
            const nextDuration = this.currentInterval === 'exercise' ? 20 : 15;
            this.startNextSet(nextDuration);
          }
        }, 1000);
      } else {
        // Move to the next exercise if all sets are completed
        this.currentSet = 0;
        this.currentExerciseIndex++;
        // Load the image for the next exercise
        this.loadCurrentExerciseImage(); // Load image here
        this.currentInterval = 'exercise';
        this.startNextSet();
      }
    }
  }


  loadCurrentExerciseImage(): void {
    if (this.workoutPlan && this.workoutPlan.exercises.length > this.currentExerciseIndex) {
      const currentExercise = this.workoutPlan.exercises[this.currentExerciseIndex];
      // Assuming `image` is the property that holds the image URL in your Exercise model
      this.currentExerciseImage = this.baseUrl + currentExercise.picture;
      console.log(currentExercise);
    } else {
      this.currentExerciseImage = null; // Reset image if no more exercises
    }
  }


  isExerciseCompleted(exerciseIndex: number): boolean {
    return exerciseIndex < this.currentExerciseIndex;
  }

  formatTime(remainingTime: number | null): string {
    if (remainingTime === null) {
      return '00:00:00';
    }

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  getCurrentStep(): { exerciseIndex: number, setIndex: number } {
    return { exerciseIndex: this.currentExerciseIndex, setIndex: this.currentSet };
  }

  getTimerClass(): void {
    if (this.remainingTime !== null) {
      const { alert, warning } = this.COLOR_CODES;
      let remainingPathColor = 'green'; // Default color if not in alert or warning zone

      if (this.remainingTime <= alert.threshold) {
        remainingPathColor = 'red'; // Change to red if remaining time is less than alert threshold
      } else if (this.remainingTime <= warning.threshold) {
        remainingPathColor = 'orange'; // Change to orange if remaining time is less than warning threshold
      }

      this.timerClass = `base-timer__path-remaining ${remainingPathColor}`;
    }
  }




  getColorClass(remainingTime: number | null): string {
    if (remainingTime === null) {
      return 'info'; // Default color
    }

    if (remainingTime <= this.WARNING_THRESHOLD) {
      return 'warning'; // Apply warning color class
    } else if (remainingTime <= this.ALERT_THRESHOLD) {
      return 'alert'; // Apply alert color class
    } else {
      return 'info'; // Default color
    }
  }
}
