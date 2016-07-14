import {AccountStatus} from "./accountStatus";
/**
 * Created by NicolaeB on 4/26/2016.
 */
export class DemandDetailsDTO{
    public id:number;

    public title:string;

    public message:string;

    public cities:Array<string> = new Array<string>();

    public allCities:boolean;

    public phoneContact;boolean ;

    public creationDate:Date;

    public activationDate:Date;

    /* Account */

    public accountId:number;

    public accountEmail:string;

    public accountStatus:AccountStatus;

    public demandsCount:number;

    public isInEditMode:boolean=false;
}