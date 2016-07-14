/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {IPageReference} from "../../models/interfaces/iPageReference";
import {AuthorizationService} from "../../services/authorizationService";
import {Role} from "../../models/Roles";
import {LocalStorageService} from "../../services/localStorageService";
import {ApplicationConstants} from "../../models/applicationConstansts";
import {RegistrationService} from "../../services/registrationService";
import {NotificationService} from "../../services/notificationService";
import {ApplicationStateService} from "../../services/applicationStateService";
import * as template from './headerComponent.html';
import {SLIDE_DOWN_ANIMATION} from "../../pages/pageAnimations/slideDown";

@Component({
    selector: 'header-component',
    template: template,
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    animations: SLIDE_DOWN_ANIMATION
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
    private sideMenuOpened:boolean;
    private hideImage:boolean;
    private _applicationStateService:ApplicationStateService;

    constructor(router:Router, 
                localStorageService:LocalStorageService, 
                registrationService:RegistrationService, 
                notificationService:NotificationService,
                applicationStateService:ApplicationStateService ) {
        this._router = router;
        this._registrationService = registrationService;
        this._notificationService = notificationService;
        this._applicationStateService =applicationStateService;
        this._localStorageService = localStorageService;

        this._myAccountLabel = 'Contul meu';
    }

    ngOnInit():any {
        this._usersApplicationPages = [
            {link: '/firme', name: 'Firme'},
        ];

        this.setUserRoutes();
        this.setAdminRoutes();

        let me = this;
        this._localStorageService.storageStateChange.subscribe(event=> {
            me.resolveChanges(event);
        })
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
            {link: '/admin/users', name: 'Utilizatori'},
            {link: '/admin/subscribers', name: 'Abonati'},
            {link: '/admin/categorii/meniu', name: 'Categorii'},
            {link: '/admin/cereri/lista', name: 'Cereri'},
            {link: '/admin/companii', name: 'Companii'},
        ];
    }

    setUserRoutes() {
        let userState = AuthorizationService.getActiveUserState();

        if (!this.isLoggedIn() || !userState) {
            return;
        }

        this._myAccountLabel = userState.email;
        this._myAccountDropdownPages = [
            {link: '/account/demands', name: 'Cererile mele'},
            {link: '/account/details', name: 'Setari'},
        ]
    }

    chechIdNormalUser() {
        return AuthorizationService.isLoggedIn() && !AuthorizationService.hasRole(Role.ADMIN);
    }

    goToPageUsingSideMenu(link){
        this._router.navigate([link]);
        this.closeNav();
    }

    isLoggedIn() {
        return AuthorizationService.isLoggedIn();
    }

    openNav() {
        this.hideImage = true;
        setTimeout(()=>{
            this.sideMenuOpened= true;
        }, 200);
    }

    closeNav() {
        this.sideMenuOpened = false;
        setTimeout(()=>{
            this.hideImage = false;
        }, 500);
    }

    isAdminUser() {
        return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);
    }

    logoutFromSideMenu() {
        this.logout();
        this.closeNav();
    }

    logout() {
        let me = this;
        this.closeNav();
        this._registrationService.logout()
            .subscribe(
                response=> {
                    me._applicationStateService.removeUserSession();
                    //TODO Check active route
                    // me._router.navigate(['']);
                }, error=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Erroare la logout!',5);
                }
            )

    }

    addDemand(){
        this._router.navigate(['/']);
        this._localStorageService.setItem(ApplicationConstants.NAVIGATE_CREATE_DEMAND,{navigate:true});
    }

    addDemandFromMobile(){
        this._router.navigate(['/']);
        this._localStorageService.setItem(ApplicationConstants.NAVIGATE_CREATE_DEMAND,{navigate:true});
        this.closeNav();
    }
}