import {Component, OnInit} from '@angular/core';
import {Exercise} from "../Models/Exercise";
import {WorkoutService} from "../Service/workout.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit{
  exercises: Exercise[] = [];
  exerciseForm: FormGroup;
  baseUrl: string = 'http://localhost:80/uploads/';
  editingExercise:Exercise |null=null;
  private router!: Router;
  constructor(private formBuilder: FormBuilder,private workoutService : WorkoutService ,private sanitizer: DomSanitizer, private route: Router) {
    this.exerciseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      typeEx: ['', [Validators.required, Validators.maxLength(20)]],
      bodypart: ['', [Validators.required, Validators.maxLength(20)]],
      intensity: ['', [Validators.required, Validators.maxLength(20)]],
      sets: ['', Validators.required],
      reps: ['', Validators.required]
    });
    this.router=route;
  }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.workoutService.getExercises()
      .subscribe(data => {
        this.exercises = data;
        // Sanitize image URLs
        this.exercises.forEach(exercise => {
          exercise.picture = this.baseUrl + exercise.picture;
        });
      });
  }
  deleteExercise(exercise: Exercise): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.workoutService.deleteExercise(exercise.id).subscribe(() => {
        // Remove the deleted exercise from the array
        this.exercises = this.exercises.filter(e => e.id !== exercise.id);
        alert('Exercise deleted successfully.');
      }, error => {
        console.error('Error deleting exercise:', error);
        alert('Failed to delete exercise.');
      });
    }
  }
  /*editExercise(exercise : Exercise){
    this.editingExercise=exercise;
    this.exerciseForm.patchValue({
      title:exercise.title,
      description:exercise.description,
      typeEx:exercise.typeEx,
      bodypart:exercise.bodypart,
      intensity:exercise.intensity,
      sets:exercise.sets,
      reps:exercise.reps
      }
    );*/
  editExercise(exercise: Exercise): void {
    this.router.navigate(['/admin/exercise'], { state:{exercise}}); // Inclure toutes les données de l'exercice dans le state
  }



}
