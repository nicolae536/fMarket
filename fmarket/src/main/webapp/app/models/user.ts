import {AccountStatus} from "./accountStatus";
export class User {
    public id:number;
    public email:string;
    public name:string;
    public password:string;
    public type:string;
    public status:AccountStatus;
    public phone:string;
    public creationDate:Date;
    public closedDate:Date;
    public lastPasswordChangeDate:Date;
    public lastLoginDate:Date;
    public lastAutoLoginDate:Date;
    public cityId:number;
    public city:string;
    public loginTimes:number;
    public autoLoginTimes:number;
    public isInEditMode:boolean = false;
    public accountDetails: string = '';
    public userBackup: User;


    constructor(id ?, name ?, email?, type?, status?:AccountStatus, creationDate?, closedDate?, lastPasswordChangeDate?, lastLoginDate?, lastAutoLoginDate?, cityId?, city?, loginTimes?, autoLoginTimes?, phone?, accountDetails?) {
        this.id = id ? id : -1;
        this.name = name ? name : "";
        this.email = email ? email : "";
        this.type = type ? type : "";
        this.status = status ? status : null;
        this.creationDate = creationDate ? creationDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.closedDate = closedDate ? closedDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.lastPasswordChangeDate = lastPasswordChangeDate ? lastPasswordChangeDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.lastLoginDate = lastLoginDate ? lastLoginDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.lastAutoLoginDate = lastAutoLoginDate ? lastAutoLoginDate.toLocaleDateString("en-US") : new Date(1, 1, 1, 0, 0, 0, 0).toLocaleDateString("en-US");
        this.cityId = cityId ? cityId : -1;
        this.city = city ? city : -1;
        this.loginTimes = loginTimes ? loginTimes : -1;
        this.autoLoginTimes = autoLoginTimes ? autoLoginTimes : -1;
        this.phone = phone ? phone : "";
        this.accountDetails = accountDetails ? accountDetails : "";
    }

    getNewInstance():User{
        return new User();
    }

    isValid():boolean {
        if (!this.id || this.id === -1) {
            return false;
        }

        if (!this.name || this.name === "") {
            return false;
        }

        if (!this.type || this.type === "") {
            return false;
        }

        if (!this.email || this.email === "" || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.email.trim())) {
            return false;
        }

        if (!this.creationDate || this.creationDate === new Date(1, 1, 1, 0, 0, 0, 0)) {
            return false;
        }

        if (!this.lastPasswordChangeDate || this.lastPasswordChangeDate === new Date(1, 1, 1, 0, 0, 0, 0)) {
            return false;
        }

        if (!this.lastLoginDate || this.lastLoginDate === new Date(1, 1, 1, 0, 0, 0, 0)) {
            return false;
        }

        if (!this.lastAutoLoginDate || this.lastAutoLoginDate === new Date(1, 1, 1, 0, 0, 0, 0)) {
            return false;
        }

        if (!this.cityId || this.cityId === -1) {
            return false;
        }

        if (!this.city || this.city === "") {
            return false;
        }

        if (!this.loginTimes || this.loginTimes === -1) {
            return false;
        }

        if (!this.autoLoginTimes || this.autoLoginTimes === -1) {
            return false;
        }

        if (!this.phone || this.phone === "") {
            return false;
        }

        return true;
    }
}
