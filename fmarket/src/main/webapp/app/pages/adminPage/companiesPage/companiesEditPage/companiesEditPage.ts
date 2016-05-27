/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
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
// @CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})

export class CompaniesEditPage extends CompaniesEditBase implements OnInit, OnActivate {
    private companieId;

    constructor(location:Location,router:Router,companiesService:CompaniesService, notificationService:NotificationService) {
        super(location, router, companiesService, notificationService);
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        this.companieId = curr.getParam('id');
    }

    ngOnInit() {
        let me=this;
        this._companiesService.getCompanyDetails(parseInt(this.companieId))
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
                    me._router.navigate(['/admin/companie/lista']);
                }
            );
    }
}