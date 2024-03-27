import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Exercise } from '../Models/Exercise';
import { WorkoutService } from '../Service/workout.service';
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {
  workoutForm: FormGroup;
  bodyParts: string[] = ['Abdominals', 'Quadriceps', 'Shoulders', 'Chest', 'Biceps', 'Triceps', 'Lats', 'Hamstrings', 'Middle Back', 'Lower Back', 'Glutes', 'Calves', 'Forearms', 'Traps', 'Abductors', 'Adductors', 'Neck'];
  selectedBodyParts: string[] = [];
  searchText: string = '';
  exercises: Exercise[] = [];
  filteredExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];
  totalElements = 0;
  totalPages = 0;
  currentPage = 0;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder,
              private workoutService: WorkoutService,public dialogRef: MatDialogRef<AddPlanComponent>,
              private sanitizer: DomSanitizer) {
    this.workoutForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      image: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  ngOnInit(): void {
    this.getActiveExercises(0, 10);
  }

  searchExercises(): void {
    this.workoutService.searchExercises(this.selectedBodyParts.join(','), this.searchText)
      .subscribe(
        (exercises: Exercise[]) => {
          this.filteredExercises = exercises;
        },
        (error) => {
          console.error('Error searching exercises:', error);
        }
      );
  }

  getActiveExercises(page: number, size: number): void {
    this.workoutService.getActiveExercises(page, size)
      .subscribe((pageData: any) => {
        this.exercises = pageData.content;
        this.totalElements = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.currentPage = pageData.number;
        this.searchExercises(); // Call searchExercises to filter based on search text
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      const nextPage = this.currentPage + 1;
      const size = 10;
      this.getActiveExercises(nextPage, size);
      this.searchExercises();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      const previousPage = this.currentPage - 1;
      const size = 10;
      this.getActiveExercises(previousPage, size);
      this.searchExercises();
    }
  }

  selectExercise(exercise: Exercise): void {
    const index = this.selectedExercises.findIndex(e => e.id === exercise.id);
    if (index === -1) {
      this.selectedExercises.push(exercise);
    } else {
      this.selectedExercises.splice(index, 1);
    }
  }

  confirmSelection(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('title', this.workoutForm.get('title')!.value);
      formData.append('archived', 'false');
      formData.append('fileImage', this.selectedFile);
      this.selectedExercises.forEach(exercise => {
        formData.append('selectedExerciseIds', exercise.id.toString());
      });
      this.workoutService.addPlan(formData).subscribe(() => {
        this.workoutForm.reset();
        this.selectedFile = null;
      });
    } else {
      console.error('Please select an image file.');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isSelected(exercise: Exercise): boolean {
    return this.selectedExercises.some(e => e.id === exercise.id);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getSelectedFileUrl(): SafeUrl | null {
    if (this.selectedFile) {
      const url = window.URL.createObjectURL(this.selectedFile);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      return null;
    }
  }
}
