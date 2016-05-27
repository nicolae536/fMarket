/**
 * Created by nick_ on 5/6/2016.
 */
import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";

// import {RouteParams, Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {RegistrationService} from "../../../services/registrationService";
import {NotificationService} from "../../../services/notificationService";
import {LocalStorageService} from "../../../services/localStorageService";
import {ApplicationConstants} from "../../../models/applicationConstansts";
import {Role} from "../../../models/Roles";

@Component({
    selector: 'token-confirm',
    templateUrl: '/app/pages/registrationPage/errorPages/errorActivateTokenPage.html',
    directives:[ROUTER_DIRECTIVES]
})

export class TokenConfirmPage implements OnActivate{
    private _registrationService:RegistrationService;
    private _router:Router;
    private _notificationService:NotificationService;
    private _localeStorageService:LocalStorageService;
    private showTokenError:boolean = false;

    constructor(router:Router, registrationService:RegistrationService, notificationService:NotificationService, localeStorageService:LocalStorageService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._localeStorageService = localeStorageService;

    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        this.validateToken(curr.getParam('token'));
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
                        me._notificationService.emitNotificationToRootComponent({
                            type: 'danger',
                            dismisable: true,
                            message: 'Serverul nu a returnat userul autentificat!',
                            timeout:5
                        });
                        me._localeStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, {email:null, accountType:Role.USER, loggedIn:false});
                        return;
                    }
                    me._localeStorageService.setItem(ApplicationConstants.ACTIVE_USER_STATE, response);
                    me._notificationService.emitNotificationToRootComponent({
                        type: 'success',
                        dismisable: true,
                        message: 'Cont activat cu succes.',
                        timeout:5
                    });
                    me._router.navigate(['/']);
                },
                error=> {
                   me.showTokenError = true;
                }
            )
    }
}