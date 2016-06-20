/**
 * Created by nick_ on 4/26/2016.
 */


import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from "@angular/core";
import {Router} from "@angular/router";

import {ApplicationStateService} from "../../../services/applicationStateService";
import {RegistrationService} from "../../../services/registrationService";
import {NotificationService} from "../../../services/notificationService";
import {JqueryService} from "../../../services/jqueryService";

import {RegistrationComponent} from "../../../components/registrationComponent/registrationComponent";

import {RegisterAccount} from "../../../models/registerAccount";
import {FaceBookService} from "../../../services/faceBookService";

let template = require('../registrationPage.html');

@Component({
    selector: 'login-page',
    template: template,
    directives: [RegistrationComponent]
})
export class LoginPage implements OnInit, AfterViewChecked {
    //<editor-fold desc="Services">
    private _registrationService:RegistrationService;
    private _notificationService:NotificationService;
    private _registrationComponent:RegistrationComponent;
    private _applicationStateService:ApplicationStateService;
    private _router:Router;
    private _faceBookService:FaceBookService;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _formButtonLabel:string;
    @ViewChild('registrationPageRef') _registrationPageRef:ElementRef;
    private _formTitle:string;
    private _showNewsletterField:boolean;
    private _passwordLabel:string;
    private _showForgetPasswordLink:boolean;
    private _showRegisterLink:boolean;
    private _forgetPasswordLabel:string;
    private _showRememberMeLink:boolean;
    private _showLoginLink:boolean;
    private _loginPage;
    //</editor-fold>

    constructor(router:Router,
                registrationService:RegistrationService,
                ntificationService:NotificationService,
                applicationStateService:ApplicationStateService,
                faceBookService:FaceBookService ) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = ntificationService;
        this._applicationStateService = applicationStateService;
        this._faceBookService = faceBookService;
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
                    me._notificationService.emitErrorNotificationToRootComponent("Date de autentificare incorecte!", 5);
                    me._registrationComponent.markAllFieldsAsErrors({email:true, password:true});
                }
            )
    }

    initFLogin($event){
        let me = this;

        this._faceBookService.login()
            .subscribe(
                response=>{
                
                },
                error=>{
                    
                }
            )
    }
}