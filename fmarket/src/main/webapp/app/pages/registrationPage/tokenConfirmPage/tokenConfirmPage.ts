/**
 * Created by nick_ on 5/6/2016.
 */
import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";

import {RegistrationService} from "../../../services/registrationService";
import {NotificationService} from "../../../services/notificationService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {JqueryService} from "../../../services/jqueryService";
import {ApplicationStateService} from "../../../services/applicationStateService";

@Component({
    selector: 'token-confirm',
    templateUrl: '/app/pages/registrationPage/errorPages/errorActivateTokenPage.html',
    directives:[ROUTER_DIRECTIVES]
})

export class TokenConfirmPage implements OnActivate{
    //<editor-fold desc="Services">
    private _registrationService:RegistrationService;
    private _router:Router;
    private _notificationService:NotificationService;
    private _applicationStateService:ApplicationStateService;
    //</editor-fold>

    //<editor-fold desc="Internal variables">
    private showTokenError:boolean = false;
    //</editor-fold>

    constructor(router:Router, registrationService:RegistrationService, notificationService:NotificationService, applicationStateService:ApplicationStateService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._applicationStateService = applicationStateService;

    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        let token = this.getParameterByName('token', location.href);

        this.validateToken(token);
        JqueryService.removeElementWithAnimation('#'+ApplicationConstants.LOADING_SPINNER);
    }

    private validateToken(token:string) {
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