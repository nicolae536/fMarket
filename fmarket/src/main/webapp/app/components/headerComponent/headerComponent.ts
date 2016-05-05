/**
 * Created by nick_ on 4/12/2016.
 */
import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {IPageReference} from "../../models/interfaces/iPageReference";
import {AuthorizationService} from "../../services/authorizationService";

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

    constructor() {}

    ngOnInit():any {
        this._usersApplicationPages = [
            {link: 'Home', name: 'Home'},
            {link: 'Registration', name: 'Registration'},
            {link: 'Login', name: 'Login'}
        ];

        if (AuthorizationService.isLoggedIn()) {
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
    }

    isLoggedIn() {
        return AuthorizationService.isLoggedIn();
    }
}