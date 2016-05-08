/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router-deprecated";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

import {IPageReference} from "../../models/interfaces/iPageReference";
import {AuthorizationService} from "../../services/authorizationService";
import {Role} from "../../models/Roles";
import {LocalStorageService} from "../../services/localStorageService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {RegistrationService} from "../../services/registrationService";
import {NotificationService} from "../../services/notificationService";

let directoryPath = '/app/components/headerComponent';
@Component({
    selector: 'header-component',
    templateUrl: directoryPath + '/headerComponent.html',
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES]
})

export class HeaderComponent implements OnInit {
    _usersApplicationPages:Array<IPageReference>;
    _adminApplicationPages:Array<IPageReference>;

    _myAccountLabel:string;
    _myAccountDropdownPages:Array<IPageReference>;
    private _localStorageService:LocalStorageService;
    private _router:Router;
    private _registrationService:RegistrationService;
    private _notificationService:NotificationService;

    constructor(router:Router, localStorageService:LocalStorageService, registrationService:RegistrationService, notificationService:NotificationService) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        let me = this;

        this._localStorageService = localStorageService;
        this._localStorageService.storageStateChange.subscribe(event=> {
            me.resolveChanges(event);
        })
        this._myAccountLabel = 'Contul meu';
    }

    ngOnInit():any {
        this._usersApplicationPages = [
            {link: 'Home', name: 'Home'},
        ];

        this.setUserRoutes();
        this.setAdminRoutes();
    }

    resolveChanges(event) {
        this.setUserRoutes();
        this.setAdminRoutes();
    }

    setAdminRoutes() {
        if (!this.isAdminUser()) {
            return;
        }

        this._adminApplicationPages = [
            {link: 'Admin/Users', name: 'Useri'},
            {link: 'Admin/Subscribers', name: 'Subscriberi'},
            {link: 'Admin/Categories/CategoriesMenu', name: 'Meniu categorii'},
            {link: 'Admin/Categories/Companies', name: 'Compani'},
            {link: 'Admin/Categories/Domains', name: 'Domenii'},
            {link: 'Admin/Demands/NewDemandsList', name: 'Cereri noi'},
            {link: 'Admin/Demands/DemandsList', name: 'Cereri'}
        ];
    }

    setUserRoutes() {
        let userState = AuthorizationService.getActiveUserState();

        if (!this.isLoggedIn() || !userState) {
            return;
        }

        this._myAccountLabel = userState.email;
        this._myAccountDropdownPages = [
            {link: 'Account/Demands', name: 'Anunturile mele'},
            {link: 'Account/Details', name: 'Setari'},
        ]
    }

    isLoggedIn() {
        return AuthorizationService.isLoggedIn();
    }

    isAdminUser() {
        return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);
    }

    logout() {
        let me=this;
        this._registrationService.logout()
            .map(response=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response=> {
                    me._localStorageService.removeItem(ApplicationConstants.ACTIVE_USER_STATE);
                    me._router.navigate(['Home']);
                }, error=> {
                    me._notificationService.emitNotificationToRootComponent({type:'danger', dismisable:true, message:'Erroare la logout!', timeout:5})
                }
            )

    }
}