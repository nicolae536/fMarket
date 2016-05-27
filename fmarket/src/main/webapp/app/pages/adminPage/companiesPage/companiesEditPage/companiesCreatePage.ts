/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {RouteParams, Router, CanActivate} from "@angular/router";
import {Location} from "@angular/common";
import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";
import {CompaniesEditBase} from "./companiesEditBase";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";


@Component({
    selector:'companies-edit-page',
    templateUrl:'/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
    directives:[CompaniesEditComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CreateCompaniesPage extends CompaniesEditBase implements OnInit {

    constructor(location:Location,router:Router,companiesService:CompaniesService, notificationService:NotificationService) {
        super(location, router, companiesService, notificationService);
    }

    ngOnInit() {
        this._companie = NewCompanyRequest.getEmptyCompany();
    }
}