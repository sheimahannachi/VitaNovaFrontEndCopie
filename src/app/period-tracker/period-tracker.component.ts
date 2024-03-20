import { Component, ViewChild, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { PeriodTrackerServiceService } from '../Service/period-tracker-service.service';
import { PeriodTracker } from '../Models/PeriodTracker';
import { DateRange } from '@angular/material/datepicker';

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
  selectedDateRange: DateRange<Date> | undefined;
  today: Date = new Date();
  dateErrorMessage: string = '';
  symptomErrorMessage: string = '';
  moodErrorMessage: string = '';
  periodLength: number = 0;
  periodLengthErrorMessage: string = '';

 

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
      this.selectedDateRange = new DateRange<Date>(null, null);


    });
  }
  
  handleDateChange(dateRange: DateRange<Date>): void {
    // Update selectedDateRange when the date changes
    this.selectedDateRange = dateRange;
  }


  getPeriodTrackerById(idPeriod: number): void {
    this.periodTrackerService.getPeriodTrackerById(idPeriod)
      .subscribe(periodTracker => {
        this.periodTracker = periodTracker;
        this.selectedDateRange = new DateRange<Date>(new Date(periodTracker.startDate), null);
        this.symptoms = periodTracker.symptoms;
        this.mood = periodTracker.mood;
        this.periodLength = periodTracker.periodLength;

        
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
    this.dateErrorMessage = '';
    this.symptomErrorMessage = '';
    this.moodErrorMessage = '';
    this.periodLengthErrorMessage = '';

    // Validate period length
    if (this.periodLength <= 0) {
      this.periodLengthErrorMessage = 'Period length must be greater than 0.';
      return;
    }
    if (!this.selectedDateRange || !this.selectedDateRange.start) {
      console.error('Please select a valid start date.');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());

// Adjust hours, minutes, seconds, and milliseconds to match today's date
twoYearsAgo.setHours(0, 0, 0, 0);
    
    if (this.selectedDateRange.start < twoYearsAgo) {
      this.dateErrorMessage =('Selected date should not be over 2 years ago.');
      return;
    }
    if (this.selectedDateRange.start > today) {
      this.dateErrorMessage = 'Selected date should not be in the future.';
      return;
    }

    if (this.symptoms.length === 0) {
      this.symptomErrorMessage =('Please select at least one symptom.');
      return;
    }

    if (!this.mood) {
      this.moodErrorMessage =('Please select a mood.');
      return;
    }






    if (this.selectedDateRange) {
        // Extract the start date from the selected date range
        const startDate = this.selectedDateRange?.start ? 
            this.selectedDateRange.start.toLocaleDateString('en-US', { timeZone: 'Africa/Tunis' }) : '';
        if (this.idPeriod) {
            // Update existing PeriodTracker
            const cycleLength = (document.getElementById('cycle-length') as HTMLSelectElement).value;
            const updatedPeriodTracker = new PeriodTracker(
                startDate,
                parseInt(cycleLength),
                this.symptoms,
                this.mood,
                this.periodLength 
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
            const lastPeriodStartDate = this.selectedDateRange?.start ? 
            this.selectedDateRange.start.toLocaleDateString('en-US', { timeZone: 'Africa/Tunis' }) : '';


            console.log('Cycle Length:', cycleLength);
            console.log('Last Period Start Date:', startDate);
            console.log('Symptoms:', this.symptoms);
            console.log('Mood:', this.mood);
            console.log('periodLength:', this.periodLength);


            const periodTracker = new PeriodTracker(
                startDate,
                parseInt(cycleLength),
                this.symptoms,
                this.mood,
                this.periodLength 
            );

            this.periodTrackerService.addPeriodInformation(periodTracker).subscribe(response => {
                console.log('Period Tracker information added successfully:', response);
                this.router.navigate(['/ShowPeriodInformation']);
            }, error => {
                console.error('Error adding Period Tracker information:', error);
            });

            // Reset values and close the picker
            this.symptoms = [];
            this.mood = '';
            this.picker.close();
        }
    } else {
        console.error('No date range selected.');
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

  

