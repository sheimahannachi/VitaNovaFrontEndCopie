import {Component, Inject, Input, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exercise-link-model',
  templateUrl: './exercise-link-model.component.html',
  styleUrls: ['./exercise-link-model.component.css']
})
export class ExerciseLinkModelComponent implements OnInit {
  @Input() exerciseLink: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ExerciseLinkModelComponent>
  ) { }

  ngOnInit(): void {
    this.exerciseLink = this.data.exerciseLink;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.exerciseLink)
      .then(() => {
        console.log('Exercise link copied to clipboard:', this.exerciseLink);
        // Optionally, you can show a success message to the user
        this.dialogRef.close();
      })
      .catch(error => {
        console.error('Error copying exercise link to clipboard:', error);
        // Optionally, you can show an error message to the user
        this.dialogRef.close();
      });
  }
}
