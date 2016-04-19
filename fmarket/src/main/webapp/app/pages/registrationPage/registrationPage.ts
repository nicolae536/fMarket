/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from 'angular2/core';
import {RegistrationComponent, RegisterAccount} from "../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../services/registrationService";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector:'registration-page',
    templateUrl:folderPath + '/registrationPage.html',
    providers:[RegistrationService],
    directives:[RegistrationComponent]
})
export class RegistrationPage implements OnInit{
    private _registrationService:RegistrationService;

    constructor(registrationService:RegistrationService){
        this._registrationService = registrationService;
    }

    ngOnInit():any {
        return undefined;
    }

    registerUser(account:RegisterAccount){
        this._registrationService.createAccount(account)
            .map((response)=>{
                if(response.text()){
                    return response.json();
                }
            })
            .subscribe(
                response =>{

                },
                error =>{

                }
            )
    }
}