export class RequestType{
    id:string;
    name:string;
    companies:number;
    isInEditMode:boolean = false;
    backupRequestType:RequestType;

    constructor(id?:string, name?:string, companies?:number) {
        this.id = id;
        this.name = name;
        //this.companies = companies;
    }
}