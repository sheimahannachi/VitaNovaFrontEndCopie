import { Community } from "./Community";
import { UserModule } from "./user/user.module";



export class Communication{

    id!:number;

    message!:string;

    sentDate!:Date;

    seen!:boolean;

    sender: UserModule;

    reciever: UserModule;

    community :Community;
    

}