import {Intensity} from "./Intensity";
export class Exercise {
  id !: number;
  title!: string;
  description !: string;
  typeEx  !: string;
  bodypart!: string;
  intensity!: Intensity;
  sets!: string;
  reps!: string;
  picture!: string;
  archived!:boolean;
  rating!:number;


}
