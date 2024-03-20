import { UserModule } from "./user/user.module";


export class Community{
    id!:Number;

    communityName!:string;
    description!:string;

    status!:boolean;

    chatChannel!:string;
   
    creationDate:Date;
    
    creator:UserModule;

    membres:UserModule[];


    

}