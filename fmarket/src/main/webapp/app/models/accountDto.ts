import {Select2Item} from "../components/selectComponent/selectComponent";
/**
 * Created by NicolaeB on 4/27/2016.
 */
export class AccountDto {
    public id:number;
    public email:string;
    public accountType:string;
    public status:string;
    public creationDate:string;
    public closedDate:string;
    public activationDate:string;
    public lastPasswordChangeDate:string;
    public lastLoginDate:string;
    public lastAutoLoginDate:string;
    public name:string;
    public cityId:number;
    public city:string;
    public loginTimes:number;
    public autoLoginTimes:number;
    public cityItem:Select2Item;
    public newPassword:string


    constructor(id:number, email:string, type:string, status:string, creationDate:string, closedDate:string, activationDate:string, lastPasswordChangeDate:string, lastLoginDate:string, lastAutoLoginDate:string, name:string, cityId:number, city:string, loginTimes:number, autoLoginTimes:number, cityItem:Select2Item, newPassword:string) {
        this.id = id;
        this.email = email;
        this.accountType = type;
        this.status = status;
        this.creationDate = creationDate;
        this.closedDate = closedDate;
        this.activationDate = activationDate;
        this.lastPasswordChangeDate = lastPasswordChangeDate;
        this.lastLoginDate = lastLoginDate;
        this.lastAutoLoginDate = lastAutoLoginDate;
        this.name = name;
        this.cityId = cityId;
        this.city = city;
        this.loginTimes = loginTimes;
        this.autoLoginTimes = autoLoginTimes;
        this.cityItem = cityItem;
        this.newPassword = newPassword;
    }

    static getEmptyInstance() {
        return new AccountDto(-1, '', '', '', (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), (new Date()).toLocaleDateString(), '', null, '', 0, 0, null, '');
    }
}
