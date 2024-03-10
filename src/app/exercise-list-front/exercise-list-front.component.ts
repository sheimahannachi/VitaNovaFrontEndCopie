import { Component, OnInit } from '@angular/core';
import { WorkoutService } from "../Service/workout.service";
import { Exercise } from "../Models/Exercise";
import { MatDialog } from '@angular/material/dialog';
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {UserRating} from "../Models/UserRating";

@Component({
  selector: 'app-exercise-list-front',
  templateUrl: './exercise-list-front.component.html',
  styleUrls: ['./exercise-list-front.component.css']
})
export class ExerciseListFrontComponent implements OnInit {
  exercises: Exercise[] = [];
  baseUrl: string = 'http://localhost:80/uploads/';
  selectedExercise: Exercise | null = null;
  userRating: UserRating = new UserRating();
  exercise: Exercise | null = null; // Initialisez à null
  selectedRating: number = 0;
  constructor(private workoutService: WorkoutService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getActiveExercises();
    console.log(this.selectedExercise);
  }

  /*showExerciseDetails(exercise: Exercise): Exercise {
    this.selectedExercise = exercise;
    console.log(this.selectedExercise);
    return this.selectedExercise;
  }*/
  showExerciseDetails(exercise: Exercise): void {
    const dialogRef = this.dialog.open(ExerciseModalComponent, {
      width: '80%',
      data: exercise
    });
  }

  closeExerciseDetails(): void {
    this.selectedExercise = null;
  }

  getActiveExercises(): void {
    this.workoutService.getActiveExercises().subscribe(data => {
      this.exercises = data;
      // Sanitize image URLs
      this.exercises.forEach(exercise => {
        exercise.picture = this.baseUrl + exercise.picture;
      });
    });

  }

  toggleExerciseDetails(exercise: Exercise): void {
    if (this.selectedExercise === exercise) {
      this.selectedExercise = null;
    } else {
      this.selectedExercise = exercise;
    }
    console.log(this.selectedExercise); // Ensure that the selectedExercise is correctly assigned
  }

  rateExercise(exerciseId: number, rating: number): void {
    this.userRating.rate = rating;
    this.userRating.exerciseId = exerciseId;
    this.workoutService.saveUserExerciseRating(this.userRating, exerciseId).subscribe(
      response => {
        console.log('Évaluation sauvegardée avec succès', response);
        // Mettez à jour la liste des exercices si nécessaire
      },
      error => {
        console.error('Erreur lors de la sauvegarde de l\'évaluation', error);
      }
    );
  }



}
