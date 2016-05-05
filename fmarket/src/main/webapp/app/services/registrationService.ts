/**
 * Created by nick_ on 4/17/2016.
 */
import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";
import {RegisterAccount} from "../models/registerAccount";

@Injectable()
export class RegistrationService {
    private api:FMarketApi;
    private REGISTRATION_CONTROLLER:string = '/registration'
    private ACCOUNT_CONTROLLER:string = '/account'

    constructor(http:Http){
        this.api = new FMarketApi(http);
    }

    createAccount(account:RegisterAccount){
        return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify({email:account.email, password:account.password, subscribe:account.subscribe}));
    }

    resetPassword(account:RegisterAccount) {
        return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({email:account.email, newPassword:account.password}));
    }

    login(account:RegisterAccount){

        let credentials = "username=" + account.email + "&password=" + account.password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Login-Ajax-call', "true");

        return this.api.post('/login', credentials, {headers:headers});
    }
}