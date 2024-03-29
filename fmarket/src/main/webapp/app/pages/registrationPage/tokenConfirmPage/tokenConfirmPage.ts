/**
 * Created by nick_ on 5/6/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute} from "@angular/router";

import {RegistrationService} from "../../../services/registrationService";
import {NotificationService} from "../../../services/notificationService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationStateService} from "../../../services/applicationStateService";
import {ENTER_LEAVE_ANIMATION} from "../../pageAnimations/enterLeavePage";

@Component({
    selector: 'token-confirm',
    templateUrl: '/app/pages/registrationPage/errorPages/errorActivateTokenPage.html',
    directives:[ROUTER_DIRECTIVES],
    animations: ENTER_LEAVE_ANIMATION
})

export class TokenConfirmPage implements OnInit{
    //<editor-fold desc="Services">
    private _registrationService:RegistrationService;
    private _router:Router;
    private _notificationService:NotificationService;
    private _applicationStateService:ApplicationStateService;
    private _activatedRoute:ActivatedRoute;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    private showTokenError:boolean = false;
    private errorMessage:string = 'Linkul este invalid sau a expirat.';
    //</editor-fold>

    constructor(router:Router, _activatedRoute:ActivatedRoute,registrationService:RegistrationService, notificationService:NotificationService, applicationStateService:ApplicationStateService) {
        this._router = router;
        this._activatedRoute =_activatedRoute;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._applicationStateService = applicationStateService;

    }

    ngOnInit():any {
        this._activatedRoute.params.subscribe(params =>
            this.activateToken(params)
        );
    }

    activateToken(params):void {
        //TODO check how to override angular 2 matrix notation to query string notation
        let token = this.getParameterByName('token', location.href);

        if(location.href.indexOf('/registration?token') !== -1){
            this.confirmRegistrationToken(token);
        }

        if(location.href.indexOf('/passwordchange?token') !== -1){
            this.confirmPasswordChangeToken(token);
        }

        if(location.href.indexOf('/demand?token') !== -1){
            this.confirmDemandChangeToken(token);
        }


        JqueryService.removeElementWithAnimation('#'+ApplicationConstants.LOADING_SPINNER);
    }

    private confirmRegistrationToken(token:string) {
        let me = this;
        this._registrationService.validateToken(token)
            .subscribe(
                response=> {
                    if (!response) {
                        me._notificationService.emitErrorNotificationToRootComponent('Serverul nu a returnat userul autentificat!', 5);
                        me._applicationStateService.removeUserSession();
                        return;
                    }

                    me._applicationStateService.setApplicationSessionState(response);
                    me._notificationService.emitSuccessNotificationToRootComponent('Cont activat cu succes.', 5);
                    me._router.navigate(['/']);
                },
                error=> {
                   me.showTokenError = true;
                }
            )
    }


    private confirmPasswordChangeToken(token:string) {
        let me = this;
        this._registrationService.confirmPasswordChangeToken(token)
            .subscribe(
                response=> {
                    if (!response) {
                        me._notificationService.emitErrorNotificationToRootComponent('Serverul nu a returnat userul autentificat!', 5);
                        me._applicationStateService.removeUserSession();
                        return;
                    }

                    me._applicationStateService.setApplicationSessionState(response);
                    me._notificationService.emitSuccessNotificationToRootComponent('Parola a fost schimbata cu succes.', 5);
                    me._router.navigate(['/']);
                },
                error=> {
                    me.showTokenError = true;
                }
            )
    }

    private confirmDemandChangeToken(token:string) {
        let me = this;
        this._registrationService.confirmDemandChangeToken(token)
            .subscribe(
                response=> {
                    if (!response) {
                        me._notificationService.emitErrorNotificationToRootComponent('Serverul nu a returnat userul autentificat!', 5);
                        me._applicationStateService.removeUserSession();
                        return;
                    }

                    me._applicationStateService.setApplicationSessionState(response);
                    me._notificationService.emitSuccessNotificationToRootComponent('Cererea a fost confirmata cu succes.', 5);
                    me._router.navigate(['/']);
                },
                error=> {
                    me.showTokenError = true;
                }
            )
    }


    ///Parse the url and returns the parametre with name, using query string notation
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}