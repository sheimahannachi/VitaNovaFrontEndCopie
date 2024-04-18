import { Component,OnInit } from '@angular/core';
import { PeriodTracker } from '../Models/PeriodTracker';
import { PeriodTrackerServiceService } from '../Service/period-tracker-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from '../Models/Exercise';
import { Food } from '../Models/Foods';


@Component({
  selector: 'app-period-insights',
  templateUrl: './period-insights.component.html',
  styleUrls: ['./period-insights.component.css'],

})
export class PeriodInsightsComponent {
  periodTrackers: PeriodTracker[] = [];
  cyclePhase: string = 'Unknown'; // Default value or placeholder
  idPeriod!: number;
  nextOvulationDate?: string;
  nextPeriodDate?: string;
  userQuestion: string = ''; // Track user input
  chatHistory: string[] = [];
  exercises: Exercise[]= [];
  foods: Food[]= []; // Define an array to store fetched foods
  





  constructor(private route: ActivatedRoute, private periodTrackerService: PeriodTrackerServiceService,private router: Router) { }

    

  ngOnInit(): void {


  



    this.route.queryParams.subscribe(params => {
      this.idPeriod = params['id'];
      if (this.idPeriod) {
        // Fetch cycle phase when component initializes
        this.fetchCyclePhase(this.idPeriod);
        this.fetchNextOvulationDate(this.idPeriod);
        // Fetch next period date
        this.fetchNextPeriodDate(this.idPeriod);
        this.addChatbotClickListener();
        this.getPeriodExercises();
        this.fetchPeriodFoods();
      }
    });
  }

fetchCyclePhase(idPeriod: number) {
  console.log('Fetching cycle phase for idPeriod:', idPeriod); 

  this.periodTrackerService.getPeriodTrackerById(idPeriod).subscribe((data: any) => {
    console.log('Data received from backend:', data); 

    // Access cyclePhase instead of cycle_phase
    const cyclePhase = data ? data.cyclePhase : 'Unknown';
    console.log('Cycle phase:', cyclePhase); 

    this.cyclePhase = cyclePhase;
  }, (error) => {
    console.error('Error fetching cycle phase:', error); 
  });}

  
  fetchNextOvulationDate(idPeriod: number) {
    this.periodTrackerService.getPeriodTrackerById(idPeriod).subscribe(
      (periodTracker: PeriodTracker) => {
        this.periodTrackerService.calculateOvulationDate(periodTracker, idPeriod).subscribe(
          (ovulationDate: any) => {
            this.nextOvulationDate = ovulationDate;
          },
          (error) => {
            console.error('Error fetching next ovulation date:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching period tracker:', error);
      }
    );
  }
  
  fetchNextPeriodDate(idPeriod: number) {
    this.periodTrackerService.getPeriodTrackerById(idPeriod).subscribe(
      (periodTracker: PeriodTracker) => {
        this.periodTrackerService.calculateNextPeriodDate(periodTracker, idPeriod).subscribe(
          (periodDate: any) => {
            this.nextPeriodDate = periodDate;
          },
          (error) => {
            console.error('Error fetching next period date:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching period tracker:', error);
      }
    );
  }
  addChatbotClickListener(): void {
    // Add an event listener to the chatbot image
    const chatbotImg = document.querySelector('img[alt="Chatbot"]');
    if (chatbotImg) {
      chatbotImg.addEventListener('click', function () {
        // Toggle the display of the chat window
        const chatWindow = document.getElementById('chatWindowContainer');
        if (chatWindow) {
          chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        }
      });
    }
  }
  sendMessage(): void {
    if (this.userQuestion.trim() === '') return;
  
    // Add user question to chat history
    this.chatHistory.push(`You: ${this.userQuestion}`);
  
    // Send user question to the chatbot API
    this.periodTrackerService.askQuestionToChatbot(this.userQuestion).subscribe(
      (response) => {
        // Extract the response text from the API response object
        const responseData = response ? response.response : 'No response from chatbot';
  
        // Add chatbot response to chat history
        this.chatHistory.push(`Chatbot: ${responseData}`);
  
        // Clear user input
        this.userQuestion = '';
      },
      (error) => {
        console.error('Error asking question to chatbot:', error);
      }
    );
  }

  getPeriodExercises(): void {
    this.periodTrackerService.getPeriodExercises()
      .subscribe(exercises => this.exercises = exercises);
  }
  fetchPeriodFoods(): void {
    this.periodTrackerService.getPeriodFood()
      .subscribe(foods => this.foods = foods);
  }
  getRecipes(): void {
      // Navigate to PeriodInsightsComponent with the period ID as a query parameter
      this.router.navigate(['vitaNova/PeriodRecipes']);
    }
  




}