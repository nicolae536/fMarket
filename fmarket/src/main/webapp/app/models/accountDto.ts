import {Select2Item} from "../components/selectComponent/selectComponent";
/**
 * Created by NicolaeB on 4/27/2016.
 */
export class AccountDto{
    public id:number;
    public email:string;
    public type:string;
    public status:string;
    public creationDate:Date;
    public closedDate:Date;
    public activationDate:Date;
    public lastPasswordChangeDate:Date;
    public lastLoginDate:Date;
    public lastAutoLoginDate:Date;
    public name:string;
    public cityId:number;
    public city:string;
    public loginTimes:number;
    public autoLoginTimes:number;
    public cityItem:Select2Item;
}
