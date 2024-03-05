import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodTrackerServiceService } from '../Service/period-tracker-service.service';
import { PeriodTracker } from '../Models/PeriodTracker';

@Component({
  selector: 'app-period-tracker',
  templateUrl: './period-tracker.component.html',
  styleUrls: ['./period-tracker.component.css']
})
export class PeriodTrackerComponent implements OnInit {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  selectedDate: string = '';
  symptoms: string[] = [];
  mood: string = '';
  periodTracker: PeriodTracker | null = null;
  idPeriod!: number;
  submitted = false; // Define submitted property
 

  constructor(
    private periodTrackerService: PeriodTrackerServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPeriod = +params['idPeriod'];
      if (this.idPeriod) {
        this.getPeriodTrackerById(this.idPeriod);
      }
    });
  }

  getPeriodTrackerById(idPeriod: number): void {
    this.periodTrackerService.getPeriodTrackerById(idPeriod)
      .subscribe(periodTracker => {
        this.periodTracker = periodTracker;
        this.selectedDate = periodTracker.startDate;
        this.symptoms = periodTracker.symptoms;
        this.mood = periodTracker.mood;

        // Check symptom checkboxes based on retrieved symptoms
        this.symptoms.forEach(symptom => {
          const checkbox = document.getElementById(`symptom-${symptom.toLowerCase()}`) as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = true;
          }
        });
      });
  }
  

  handleSymptomChange(symptom: string, eventOrRating: Event | number): void {
    if (typeof eventOrRating === 'number') {
      // This branch is executed when a rating is directly passed
      this.selectedSymptoms[symptom] = eventOrRating;
    } else {
      // This branch is executed when a change event is passed
      const isChecked = (eventOrRating.target as HTMLInputElement)?.checked ?? false;
      if (isChecked) {
        this.symptoms.push(symptom);
      } else {
        const index = this.symptoms.indexOf(symptom);
        if (index !== -1) {
          this.symptoms.splice(index, 1);
        }
      }
    }
  }
  
  handleMoodChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.mood = target.value; // Assign mood directly
  }

  saveInformation() {
    if (this.idPeriod) {
      // Update existing PeriodTracker
      const cycleLength = (document.getElementById('cycle-length') as HTMLSelectElement).value;
      const updatedPeriodTracker = new PeriodTracker(
        this.selectedDate,
        parseInt(cycleLength),
        this.symptoms,
        this.mood
     
        


      );
      this.periodTrackerService.updatePeriodInformation(updatedPeriodTracker, this.idPeriod)
        .subscribe(() => {
          console.log('Period Tracker information updated successfully');
          this.router.navigate(['/ShowPeriodInformation']);
        }, error => {
          console.error('Error updating Period Tracker information:', error);
        });
    } else {
      // Add new PeriodTracker
      const cycleLength = (document.getElementById('cycle-length') as HTMLSelectElement).value;
      const lastPeriodStartDate = this.selectedDate;

      console.log('Cycle Length:', cycleLength);
      console.log('Last Period Start Date:', lastPeriodStartDate);
      console.log('Symptoms:', this.symptoms);
      console.log('Mood:', this.mood);

      const symptomsToSend = this.symptoms.length === 0 ? [] : this.symptoms;

      const periodTracker = new PeriodTracker(
        lastPeriodStartDate,
        parseInt(cycleLength),
        symptomsToSend,
        this.mood 
      );

      this.periodTrackerService.addPeriodInformation(periodTracker).subscribe(response => {
        console.log('Period Tracker information added successfully:', response);
        this.router.navigate(['/ShowPeriodInformation']);
      }, error => {
        console.error('Error adding Period Tracker information:', error);
      });

      this.selectedDate = '';
      this.symptoms = [];
      this.mood = '';
      this.picker.close();
    }
  }
  selectedSymptoms: { [key: string]: number } = {
    'Headache': 0,
    'Fatigue': 0,
    'Cramps': 0,
    'Mood Swings': 0,
    'Nausea': 0
  };

  
}

  

