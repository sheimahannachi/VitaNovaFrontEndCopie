import { UserModule } from "./user/user.module";



export class Communication{

    id!:Number;

    message!:string;

    sentDate!:Date;

    seen!:boolean;

    sender: UserModule
    

}