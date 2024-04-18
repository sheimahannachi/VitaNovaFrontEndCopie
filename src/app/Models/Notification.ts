export class Notification {
    id: number;
    content: string;
    priority: string;
    notificationDate: Date; 
    archive: boolean = false;
  
    constructor(id: number,content: string,priority: string,notificationDate: Date, archive: boolean = false) {
     
        this.id = id;
        this.content = content;
        this.priority = priority;
        this.notificationDate = notificationDate;
        this.archive = archive ;
      }
    }
  