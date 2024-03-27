// workout-program.model.ts
import {Exercise} from "./Exercise";

export class WorkoutPlan {
  id!: number;
  userId!: number; // Add user ID field
  title!: string;
  intensity!: string; // You can define an enum in Angular for Intensity if needed
  duration!: string;
  restIntervals!: string;
  sportType!: string;
  progression!: string;
  image!: string;
  archived!: boolean;
  exercises!: Exercise[];
}
