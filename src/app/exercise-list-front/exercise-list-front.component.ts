import { Component, OnInit } from '@angular/core';
import { WorkoutService } from "../Service/workout.service";
import { Exercise } from "../Models/Exercise";
import { MatDialog } from '@angular/material/dialog';
import {ExerciseModalComponent} from "../exercise-modal/exercise-modal.component";
import {UserRating} from "../Models/UserRating";
import {ExerciseLinkModelComponent} from "../exercise-link-model/exercise-link-model.component";

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
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  selectedExerciseLink: string = ''; // Define selectedExerciseLink property


  constructor(private workoutService: WorkoutService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getActiveExercises(0, 10);
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

  getActiveExercises(page: number, size: number): void {
    this.workoutService.getActiveExercises(page, size).subscribe((pageData: any) => {
      this.exercises = pageData.content; // Extracting content from the paginated response
      this.totalElements = pageData.totalElements;
      this.totalPages = pageData.totalPages;
      this.currentPage = pageData.number;

      // Iterate through each exercise to fetch the average rating
      this.exercises.forEach(exercise => {
        exercise.picture = this.baseUrl + exercise.picture;

        // Fetch the average rating for the current exercise
        this.workoutService.getAverageRating(exercise.id).subscribe((rating: number) => {
          exercise.rating = rating; // Assign the fetched rating to the exercise
        });
      });
    });
  }



  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      const nextPage = this.currentPage + 1;
      const size = 10; // Page size
      this.getActiveExercises(nextPage, size);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      const previousPage = this.currentPage - 1;
      const size = 10; // Page size
      this.getActiveExercises(previousPage, size);
    }
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

  copyExerciseLink(exerciseId: number): void {
    // Set selected exercise link
    this.selectedExerciseLink = `localhost:4200/exercises/${exerciseId}`;

    // Open the dialog with the exercise link
    this.dialog.open(ExerciseLinkModelComponent, {
      data: { exerciseLink: this.selectedExerciseLink },
      width: '80%',

    });
  }
}
