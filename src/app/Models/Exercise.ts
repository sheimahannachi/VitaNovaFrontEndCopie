import {Intensity} from "./Intensity";
export class Exercise {
  id !: number;
  title!: string;
  description !: string;
  typeEx  !: string;
  bodypart!: string;
  intensity!: Intensity;
  sets!: number;
  reps!: number;
  picture!: string;

}
