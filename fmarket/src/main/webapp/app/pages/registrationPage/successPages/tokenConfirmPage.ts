/**
 * Created by nick_ on 5/6/2016.
 */
import {Component} from "angular2/core";
import {RegistrationService} from "../../../services/registrationService";
import {RouteParams, Router} from "angular2/router";
import {NotificationService} from "../../../services/notificationService";
import {LocalStorageService} from "../../../services/localStorageService";
import {ApplicationConstants} from "../../../models/applicationConstansts";

@Component({
    selector: 'token-confirm',
    template: ''
})

export class TokenConfirmPage {
    private _registrationService:RegistrationService;
    private _router:Router;
    private _notificationService:NotificationService;
    private _localeStorageService:LocalStorageService;

    constructor(router:Router, params:RouteParams, registrationService:RegistrationService, notificationService:NotificationService, localeStorageService:LocalStorageService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._localeStorageService = localeStorageService;
        this.validateToken(params.get('token'));
    }

    private validateToken(token:string) {
        let me = this;
        this._registrationService.validateToken(token)
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response=> {
                    if (!response) {
                        return;
                    }
                    me._localeStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, response);
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'success',
                        dismisable: true,
                        message: 'Cont activat cu succes.'
                    });
                    me._router.navigate(['Home']);
                },
                error=> {
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'danger',
                        dismisable: true,
                        message: 'Tokenul este invalid'
                    });
                    me._router.navigate(['Registration']);
                }
            )
    }
}