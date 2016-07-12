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
import {Role} from "../../../models/Roles";

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
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _formButtonLabel:string;
    @ViewChild('registrationPageRef') _registrationPageRef:ElementRef;
    private _formTitle:string;
    private _passwordLabel:string;
    private _forgetPasswordLabel:string;
    private _loginPage;
    _faceBookText="Logheaza-te cu Facebook"
    //</editor-fold>

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
        this._formTitle = 'Intra in cont';
        this._formButtonLabel = 'Intra in cont';
        this._passwordLabel = 'Parola';
        this._forgetPasswordLabel = 'Click aici pentru a o reseta'
        this._loginPage = true;
        this._notificationService.removeLoading();

    }

    requestHandler(account:RegisterAccount) {
        let me=this;

        this._registrationService.login(account)
            .subscribe(
                response => {
                    me._applicationStateService.setApplicationSessionState(response);

                    if(response['accountType'] === Role.ADMIN){
                        me._router.navigate(['admin/users'])
                    }
                    else {
                        me._router.navigate([''])
                    }
                },
                error => {
                    me._notificationService.emitErrorNotificationToRootComponent("Date de autentificare incorecte!", 5);
                    me._registrationComponent.markAllFieldsAsErrors({email:true, password:true});
                }
            )
    }
}