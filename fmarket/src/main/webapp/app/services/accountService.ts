/**
 * Created by nick_ on 4/24/2016.
*/
import {Injectable} from '@angular/core';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {AccountDto} from "../models/accountDto";
import {AccountUser} from "../models/accountUser";


@Injectable()
export class AccountService {
    private _AccountController:string = '/accounts';
    private api:FMarketApi;

    constructor(api:FMarketApi) {
        this.api = api;
    }

    getAccount(){
        return this.api.get(this._AccountController + '/user');
    }

    saveEditedAccount(accountDto:AccountUser){
        console.log('edit-request');
        return this.api.post(this._AccountController +'/edit', JSON.stringify({name:accountDto.name, cityId:accountDto.cityId}));
    }

    changePassword(accountDto:AccountUser){
        console.log('changepassword-request');
        return this.api.post(this._AccountController +'/changepassword-1',
            JSON.stringify({email:accountDto.email,
                            oldPassword:accountDto.lastPassword,
                            newPassword:accountDto.newPassword,
                            newPasswordConfirm:accountDto.confirmNewPassword}));
    }
}