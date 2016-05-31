/**
 * Created by nick_ on 4/26/2016.
 */
/**
 * Created by nick_ on 4/17/2016.
 */

import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";
import {RegistrationService} from "../../../services/registrationService";
import {RegisterAccount} from "../../../models/registerAccount";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {LocalStorageService} from "../../../services/localStorageService";
import {NotificationService} from "../../../services/notificationService";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationStateService} from "../../../services/applicationStateService";

const folderPath = '/app/pages/registrationPage';

@Component({
    selector: 'login-page',
    templateUrl: folderPath + '/registrationPage.html',
    directives: [RegistrationComponent]
})
export class LoginPage implements OnInit, AfterViewChecked {
    private _registrationService:RegistrationService;
    @ViewChild('registrationPageRef') _registrationPageRef:ElementRef;
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
    private _notificationService:NotificationService;
    private _registrationComponent:RegistrationComponent;
    private _loginPage;
    private _applicationStateService:ApplicationStateService;

    constructor(router:Router,
                registrationService:RegistrationService,
                ntificationService:NotificationService,
                applicationStateService:ApplicationStateService ) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = ntificationService;
        this._applicationStateService = applicationStateService;
    }

    ngAfterViewChecked():any {
        JqueryService.setPageHeight(this._registrationPageRef.nativeElement);
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
        this._forgetPasswordLabel = 'Click aici pentru a o reseta'
        this._showForgetPasswordLink = true;
        this._loginPage = true;
        this._notificationService.removeLoading();

    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.login(account)
            .subscribe(
                response => {
                    me._applicationStateService.setApplicationSessionState(response);
                    me._router.navigate(['/'])
                },
                error => {
                    me._notificationService.emitNotificationToRootComponent({type:"danger", dismisable:true, message:"Date de autentificare incorecte!", timeout:5});
                    me._registrationComponent.markAllFieldsAsErrors({email:true, password:true});
                }
            )
    }
}