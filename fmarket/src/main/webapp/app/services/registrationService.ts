/**
 * Created by nick_ on 4/17/2016.
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {FMarketApi} from "./fMarketApi";
import {RegisterAccount} from "../components/registrationComponent/registrationComponent";

@Injectable()
export class RegistrationService {
    private api:FMarketApi;
    private REGISTRATION_CONTROLLER:string = '/registration'
    private ACCOUNT_CONTROLLER:string = '/account'

    constructor(http:Http){
        this.api = new FMarketApi(http);
    }

    createAccount(account:RegisterAccount){
        return this.api.post(this.REGISTRATION_CONTROLLER + '/user', JSON.stringify(account));
    }

    resetPassword(account:RegisterAccount) {
        return this.api.post(this.ACCOUNT_CONTROLLER + '/changepassword', JSON.stringify({email:account.email, newPassword:account.password}));
    }
}