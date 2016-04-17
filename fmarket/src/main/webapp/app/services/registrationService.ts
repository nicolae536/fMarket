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
    private ACCOUNT_CONTROLLER:string = '/registration'

    constructor(http:Http){
        this.api = new FMarketApi(http);
    }

    createAccount(account:RegisterAccount){
        return this.api.post(this.ACCOUNT_CONTROLLER + '/user', JSON.stringify(account));
    }
}