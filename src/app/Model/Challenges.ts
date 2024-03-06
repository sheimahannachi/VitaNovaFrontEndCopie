import { Community } from "./Community";

export enum ChallengeType{
    WATER,
    CALORIES
}


export class Challenges
{

    id:number;

    name:string;

    creationDate:Date;

    active:boolean;

    description:string;

    goal:number;
    type:ChallengeType;

    community:Community;



}