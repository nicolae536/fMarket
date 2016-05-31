/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {Location} from "@angular/common";

import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {CompaniesEditBase} from "./companiesEditBase";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";
import {LocalizationService} from "../../../../services/localizationService";

@Component({
    selector:'companies-edit-page',
    templateUrl:'/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
    directives:[CompaniesEditComponent]
})

export class CompaniesEditPage extends CompaniesEditBase implements OnInit, OnActivate {
    private companieId;

    constructor(location:Location,
                router:Router,
                companiesService:CompaniesService,
                notificationService:NotificationService,
                localizationService:LocalizationService) {
        super(location, router, companiesService, notificationService, localizationService);
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        this.companieId = curr.getParam('id');
    }

    ngOnInit() {
        let me=this;
        this._companiesService.getCompanyDetails(parseInt(this.companieId))
            .subscribe(
                response=>{
                    me._companie = response;
                },
                error=>{
                    me._notificationService.emitErrorNotificationToRootComponent('Erroare la incarcarea companiei!',5);
                    me._location.back();
                }
            );
    }

    saveCompanie(companieDto:NewCompanyRequest){
        let me=this;

        this._companiesService.editCompany(companieDto)
            .subscribe(
                success =>{
                    me._location.back();
                },
                error =>{

                }
            )
    }
}