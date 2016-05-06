/**
 * Created by nick_ on 4/26/2016.
 */
/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit} from "angular2/core";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount} from "../../../models/registerAccount";
import {Router} from "angular2/router";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {LocalStorageService} from "../../../services/localStorageService";
import {NotificationService} from "../../../services/notificationService";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'login-page',
    templateUrl: folderPath + '/registrationPage.html',
    providers: [RegistrationService],
    directives: [RegistrationComponent]
})
export class LoginPage implements OnInit {
    private _registrationService:RegistrationService;

    private _formTitle:string;
    private _formButtonLabel:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _showRegisterLink:boolean;
    private _forgetPasswordLabel:string;
    private _showRememberMeLink:boolean;
    private _showLoginLink:boolean;
    private _router:Router;
    private _localStorageService:LocalStorageService;
    private _notificationService:NotificationService;
    private _registrationComponent:RegistrationComponent;

    constructor(router:Router, registrationService:RegistrationService,localStorageService:LocalStorageService, ntificationService:NotificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._localStorageService = localStorageService;
        this._notificationService = ntificationService;
    }

    referenceComponent($event){
        this._registrationComponent = $event;
    }

    ngOnInit():any {
        this._showLoginLink = false;
        this._showRememberMeLink = true;
        this._formTitle = 'Intra in cont';
        this._formButtonLabel = 'Intra in cont';
        this._showNewsletterField = false;
        this._passwordLabel = 'Parola';
        this._showRegisterLink = true;
        this._forgetPasswordLabel = 'Ai uitat parola ?'
        this._showForgetPasswordLink = true;
    }

    requestHandler(account:RegisterAccount) {
        let me=this;
        this._registrationService.login(account)
            .map((response)=> {
                if (response.text()) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    response.isLoggedIn = true;
                    me._localStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, response);
                    me._router.navigate(['Home'])
                },
                error => {
                    me._notificationService.emitNotificationToRootComponent({type:"danger", dismisable:true, message:"Date de autentificare incorecte!"});
                    me._registrationComponent.markAllFieldsAsErrors();
                }
            )
    }
}