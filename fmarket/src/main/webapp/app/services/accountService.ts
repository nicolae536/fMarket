/**
 * Created by nick_ on 4/24/2016.
*/
import {Injectable} from '@angular/core';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {AccountDto} from "../models/accountDto";


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

    saveEditedAccount(accountDto:AccountDto){
        return this.api.post(this._AccountController +'/edit', JSON.stringify(accountDto));
    }
}