/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {IPageReference} from "../../models/interfaces/iPageReference";
import {AuthorizationService} from "../../services/authorizationService";
import {Role} from "../../models/Roles";
import {LocalStorageService} from "../../services/localStorageService";
import {ApplicationConstants} from "../../models/applicationConstansts";

let directoryPath = '/app/components/headerComponent';
@Component({
    selector: 'header-component',
    templateUrl: directoryPath + '/headerComponent.html',
    directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
    providers: [AuthorizationService]
})

export class HeaderComponent implements OnInit {
    _usersApplicationPages:Array<IPageReference>;
    _adminApplicationPages:Array<IPageReference>;

    _myAccountLabel:string;
    _myAccountDropdownPages:Array<IPageReference>;
    private _localStorageService:LocalStorageService;
    private _router:Router;

    constructor(router:Router,localStorageService:LocalStorageService) {
        this._router = router;
        let me=this;

        this._localStorageService = localStorageService;
        this._localStorageService.storageStateChange.subscribe(event=>{
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

    resolveChanges(event){
        this.setUserRoutes();
        this.setAdminRoutes();
    }

    setAdminRoutes(){
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

    setUserRoutes(){
        let userState = AuthorizationService.getActiveUserState();

        if(!this.isLoggedIn() || !userState){
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

    logout(){
        this._localStorageService.removeItem(ApplicationConstants.ACTIVE_USER_STATE);
        this._router.navigate(['Home']);
    }
}