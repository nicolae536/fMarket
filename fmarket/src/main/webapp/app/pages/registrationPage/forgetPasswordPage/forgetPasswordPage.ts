/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from 'angular2/core';
import {RegistrationComponent, RegisterAccount} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";

const folderPath = '/app/pages/registrationPage/forgetPasswordPage';

@Component({
    selector:'forget=password-page',
    templateUrl:folderPath + '/forgetPasswordPage.html',
    styles:[`
    .forget-password-page{
        padding-top: 14vh;
    }
    `],
    directives:[RegistrationComponent],
    providers:[RegistrationService]
})
export class ForgetPasswordPage implements OnInit{
    private _registrationService:RegistrationService;
    
    constructor(registrationService:RegistrationService){
        this._registrationService = registrationService;
    }

    ngOnInit(){
        
    }

    resetPassword(account:RegisterAccount){
        this._registrationService.resetPassword(account)
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