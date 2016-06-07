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
    selector: 'companies-edit-page',
    templateUrl: '/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
    directives: [CompaniesEditComponent]
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
        this.getCities();
        this.getCompanieDomains();
        this.getDomains();

        let me = this;
        this._companiesService.getCompanyDetails(parseInt(this.companieId))
            .subscribe(
                response=> {
                    response['city'] = response['city'] ? {displayName: response['city']['name'], boundItem: response['city']} : null;
                    response['companyDomain'] = response['companyDomain'] ? {displayName: response['companyDomain']['name'], boundItem: response['companyDomain']} : null;
                    response['demandDomains'] =  me._localizationService.mapNameToSelect2Item(response['demandDomains']);
                    me._companie = response;
                },
                error=> {
                    me._notificationService.emitErrorNotificationToRootComponent('Erroare la incarcarea companiei!', 5);
                    me._location.back();
                }
            );
    }

    saveCompanie(companieDto:NewCompanyRequest) {
        let me = this;

        let logoFile = companieDto['logoFile'];
        companieDto['logoFile'] = null;

        this._companiesService.editCompany(companieDto)
            .subscribe(
                success => {
                    if (logoFile) {
                        me.uploadCompanyLogo(companieDto['id'], logoFile);
                        return;
                    }
                    me._location.back();
                },
                error => {

                }
            );
    }

    uploadCompanyLogo(id, logoImage) {
        let me = this;

        this._companiesService.uploadCompanyLogo(id, logoImage)
            .subscribe(
                success => {
                    me._location.back();
                },
                error => {

                }
            );
    }
}