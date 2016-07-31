/**
 * Created by nick_ on 4/17/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {FMarketApi} from "./fMarketApi";
import {RegisterAccount} from "../models/forms/registerAccount";

@Injectable()
export class RegistrationService {
    private api:FMarketApi;
    private REGISTRATION_CONTROLLER:string = '/registration'
    private ACCOUNT_CONTROLLER:string = '/accounts'

    constructor(api:FMarketApi){
        this.api = api;
    }

    createAccount(account:RegisterAccount){
        let newAccount = account ? {email:account.username.value, password:account.password.value, subscribe:account.subscribe.value} : {email:null, password:null, subscribe:null};
        return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify(newAccount));
    }

    resetPassword(account:RegisterAccount) {
        let newAccount = account ? {email:account.username.value, newPassword:account.password.value} : {email:null, newPassword:null};

        return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({email:account.username, newPassword:account.password.value}));
    }

    login(account:RegisterAccount){
        let newAccount = account ? account : {username:{value: null}, password: {value: null}, rememberMe:{value: null}};

        let credentials = `username=${newAccount.username.value}&password=${newAccount.password.value}&remember-me=${newAccount.rememberMe.value}`;

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