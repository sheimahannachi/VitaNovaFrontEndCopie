import { UserModule } from "./user/user.module";


export class Community{
    id!:number;

    communityName!:string;
    description!:string;

    status!:boolean;

    chatChannel!:string;
   
    creationDate:Date;
    
    creator:UserModule;

    membres:UserModule[];


    

}