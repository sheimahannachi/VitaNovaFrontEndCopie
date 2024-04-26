  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import {WorkoutService} from "../Service/workout.service";
  import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
  import axios from 'axios';


  @Component({
    selector: 'app-timer-api',
    templateUrl: './timer-api.component.html',
    styleUrls: ['./timer-api.component.css']
  })
  export class TimerApiComponent implements OnInit {
    workoutPlan: any = null;
    timerInterval: any;
    remainingTime: number | null = null;
    currentSet: number = 0;
    currentInterval: 'exercise' | 'rest' = 'exercise';
    currentExerciseIndex: number = 0;
    currentExerciseImage: string | null = null; // Declare currentExerciseImage property
    baseUrl: string = 'http://localhost:80/uploads/';
    timerClass: string = 'base-timer__path-remaining';
    youtubeVideo: any = null; //
    EXERCISE_DURATION = 2; // Duration of exercise in seconds
    REST_DURATION = 1; // Duration of rest in seconds
    audioUrls: string[] = []; // Déclarez un tableau pour stocker les URLs audio
    youtubeAudioUrls: any[] = []; // Array to store YouTube audio URLs

   // audioList: { downloadUrl: string }[] = []; // Array to store audio URLs
    mp3DownloadLink: string | null = null;


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

    constructor(private route: ActivatedRoute, private workoutService: WorkoutService, private http: HttpClient) {
    }

    ngOnInit(): void {
      this.workoutPlan = history.state.workoutPlan;
      //this.downloadTrackFromSpotify();
      this.fetchMP3DownloadLink();

    }

    startTimer(): void {
      if (!this.workoutPlan || this.currentExerciseIndex >= this.workoutPlan.exercises.length) {
        console.log('No workout plan or all exercises completed.');
        return;
      }

      const exerciseCount = this.workoutPlan.exercises.length;

      this.startNextSet();
    }

    startNextSet(remainingTime?: number): void {
      if (this.workoutPlan && this.currentExerciseIndex < this.workoutPlan.exercises.length) {
        const currentExercise = this.workoutPlan.exercises[this.currentExerciseIndex];
        const totalSets = 4;

        if (this.currentSet < totalSets) {
          const duration = this.currentInterval === 'exercise' ? this.EXERCISE_DURATION : this.REST_DURATION;
          this.remainingTime = remainingTime !== undefined ? remainingTime : duration;

          this.timerInterval = setInterval(() => {
            if (this.remainingTime && this.remainingTime > 0) {
              this.remainingTime--;
              this.getTimerClass();

            } else {
              clearInterval(this.timerInterval);
              this.currentInterval = this.currentInterval === 'exercise' ? 'rest' : 'exercise';

              if (this.currentInterval === 'exercise') {
                this.currentSet++;
              } else {
                if (this.currentSet === totalSets) {
                  // If all sets in current exercise are completed, move to the next exercise
                  this.currentSet = 0;
                  this.currentExerciseIndex++;
                }
              }

              const nextDuration = this.currentInterval === 'exercise' ? this.EXERCISE_DURATION : this.REST_DURATION;
              this.startNextSet(nextDuration);
            }
          }, 1000);
        } else {
          // If all sets in current exercise are completed, move to the next exercise
          this.currentSet = 0;
          this.currentExerciseIndex++;

          // Reset interval and start next exercise if available
          clearInterval(this.timerInterval);
          this.startNextExercise();
        }
      }
    }

    startNextExercise(): void {
      if (this.currentExerciseIndex < this.workoutPlan.exercises.length) {
        // Start the timer for the next exercise
        this.startNextSet(this.REST_DURATION);
      } else {
        console.log('Workout plan completed');
      }
    }

    stopTimer(): void {
      clearInterval(this.timerInterval);
      this.remainingTime = null;
    }

    getTimerClass(): void {
      if (this.remainingTime !== null) {
        const {alert, warning} = this.COLOR_CODES;
        let remainingPathColor = 'green'; // Default color if not in the alert or warning zone

        if (this.remainingTime <= alert.threshold) {
          remainingPathColor = 'red'; // Change to red if remaining time is below the alert threshold
        } else if (this.remainingTime <= warning.threshold) {
          remainingPathColor = 'orange'; // Change to orange if remaining time is below the warning threshold
        }

        this.timerClass = `base-timer__path-remaining ${remainingPathColor}`;
      }
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

    /*async downloadTrackFromSpotify(): Promise<void> {
      try {
        const headers = new HttpHeaders({
          'X-RapidAPI-Key': '2acd7d6738mshdd85e14333aac07p11cf80jsn94660876c278',
          'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
        });

        const params = new HttpParams()
          .set('track', 'workout'); // Replace 'sports' with your desired track name or ID

        const response = await this.http.get<any>('https://spotify-scraper.p.rapidapi.com/v1/track/download', { headers, params }).toPromise();

        if (response && response.status && response.youtubeVideo) {
          const youtubeVideo = response.youtubeVideo;
          // Check if the response contains the required YouTube video data
          if (youtubeVideo && youtubeVideo.id && youtubeVideo.title) {
            // Extract the audio URLs from the YouTube video data
            this.youtubeAudioUrls = youtubeVideo.audio.map((audio: any) => audio.url);
            console.log(this.youtubeAudioUrls)
          } else {
            console.error('YouTube video data is incomplete.');
          }
        } else {
          console.error('Error downloading track:', response);
        }
      } catch (error) {
        console.error('Error downloading track:', error);
      }
    }*/

    /*async fetchAudioUrl(): Promise<void> {
      const options = {
        method: 'POST',
        url: 'https://youtube-to-mp315.p.rapidapi.com/download',
        params: {
          url: 'https://www.youtube.com/watch?v=kTb2F45USZk',
          format: 'mp3'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4002e99e48msh7d45dac1329dfd6p1b38d3jsn9832ed5a9017',
          'X-RapidAPI-Host': 'youtube-to-mp315.p.rapidapi.com'
        },
        data: {}
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);

        if (response.data && response.data.status === 'CONVERTING') {
          this.audioList = [{downloadUrl: response.data.downloadUrl}];
          console.log(this.audioList);
        } else {
          console.error('Error fetching audio URL:', response.data);
        }
      } catch (error) {
        console.error('Error fetching audio URL:', error);
      }
    }*/

    async fetchMP3DownloadLink(): Promise<void> {
      const options = {
        method: 'GET',
        url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/custom/',
        params: {
          url: 'https://www.youtube.com/watch?v=iuCUQQksqkw',
          quality: '64'
        },
        headers: {
          'X-RapidAPI-Key': '2acd7d6738mshdd85e14333aac07p11cf80jsn94660876c278',
          'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        const data = response.data;
        if (data && data.status === 'finished') {
          this.mp3DownloadLink = data.dlink;
        } else {
          console.error('Error: Invalid response from the API');
        }
      } catch (error) {
        console.error('Error fetching MP3 download link:', error);
      }
    }

  }
