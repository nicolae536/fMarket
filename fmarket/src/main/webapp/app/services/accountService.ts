/**
 * Created by nick_ on 4/24/2016.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {FMarketApi} from "./fMarketApi";
import {Observable} from "rxjs/Observable";
import {AccountDto} from "../models/accountDto";


@Injectable()
export class AccountService {
    private _AccountController:string = '/account';
    private api:FMarketApi;

    constructor(http:Http) {
        this.api = new FMarketApi(http);
    }

    getAccount(){

    }

    saveEditedAccount(accountDto:AccountDto){
        return this.api.post(this._AccountController, JSON.stringify(accountDto));
    }
}