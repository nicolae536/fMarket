/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {RouteParams, Router, CanActivate} from "@angular/router-deprecated";
import {Location} from "@angular/common";

import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {AuthorizationService} from "../../../../services/authorizationService";
import {Role} from "../../../../models/Roles";
import {CompaniesEditBase} from "./companiesEditBase";


@Component({
    selector:'companies-edit-page',
    templateUrl:'/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
    directives:[CompaniesEditComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesEditPage extends CompaniesEditBase implements OnInit {
    
    constructor(location:Location,router:Router,companiesService:CompaniesService, routeParametres:RouteParams, notificationService:NotificationService) {
        super(location, router, companiesService, routeParametres, notificationService);
    }

    ngOnInit() {
        let me=this;
        this._companiesService.getCompanyDetails(parseInt(this._routeParametres.get('id')))
            .map(response=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                response=>{
                    me._companie = response;
                },
                error=>{
                    me._notificationService.emitErrorNotificationToRootComponent('Erroare la incarcarea companiei!',5);
                    me._router.navigate(['/Admin/Companies']);
                }
            );
    }
}