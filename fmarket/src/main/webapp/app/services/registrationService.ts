/**
 * Created by nick_ on 4/17/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {FMarketApi} from "./fMarketApi";
import {RegisterAccount} from "../models/registerAccount";

@Injectable()
export class RegistrationService {
    private api:FMarketApi;
    private REGISTRATION_CONTROLLER:string = '/registration'
    private ACCOUNT_CONTROLLER:string = '/accounts'

    constructor(api:FMarketApi){
        this.api = api;
    }

    createAccount(account:RegisterAccount){
        let newAccount = account ? {email:account.email, password:account.passwords.password, subscribe:account.subscribe} : {email:null, password:null, subscribe:null};
        return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify(newAccount));
    }

    resetPassword(account:RegisterAccount) {
        let newAccount = account ? {email:account.email, newPassword:account.passwords.password} : {email:null, newPassword:null};

        return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({email:account.email, newPassword:account.passwords.password}));
    }

    login(account:RegisterAccount){
        let newAccount = account ? account : {email:null, passwords:{password:null}, rememberMe:null};

        let credentials = `username=${newAccount.email}&password=${newAccount.passwords.password}&remember-me=${newAccount.rememberMe}`;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-Login-Ajax-call', "true");

        return this.api.post('/login', credentials, {headers:headers});
    }

    logout(){
        return this.api.post('/logout','');
    }

    validateToken(token){
        return this.api.get('/confirm' + this.REGISTRATION_CONTROLLER + `?token=${token}`);
    }

    confirmPasswordChangeToken(token){
        return this.api.get('/confirm/passwordchange' + `?token=${token}`);
    }

    confirmDemandChangeToken(token){
        return this.api.get('/confirm/demand' + `?token=${token}`);
    }

    checkIfLoggedIn() {
        return this.api.get('/accounts/user');
    }
}