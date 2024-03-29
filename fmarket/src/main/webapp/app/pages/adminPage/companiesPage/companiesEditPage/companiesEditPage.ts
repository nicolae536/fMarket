/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {CompaniesEditBase} from "./companiesEditBase";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";
import {LocalizationService} from "../../../../services/localizationService";

import {CompanyFormModel} from "../../../../models/forms/company";

import * as template from './companiesEditPage.html';

@Component({
    selector: 'companies-edit-page',
    template:template,
    directives: [CompaniesEditComponent]
})

export class CompaniesEditPage extends CompaniesEditBase implements OnInit {
    private companieId;    

    constructor(location:Location,
                router:Router,
                companiesService:CompaniesService,
                notificationService:NotificationService,
                localizationService:LocalizationService,
                //initialized component
                private route: ActivatedRoute) {
        super(location, router, companiesService, notificationService, localizationService);
        this._isInEditMode = true;
    }

    ngOnInit() {
        
        this.getCities();
        this.getCompanieDomains();
        this.getDomains();
        this.route.params.subscribe(params=>{
            this.companieId = +params['id'];
            this.getCompanyDetails();
        })

    }

    getCompanyDetails(){

        let me = this;
        this._companiesService.getCompanyDetails(parseInt(this.companieId))
            .subscribe(
                response => {
                    
                    response['city'] = response['city'] ? {displayName: response['city']['name'], boundItem: response['city']} : null;
                    response['companyDomain'] = response['companyDomain'] ? {displayName: response['companyDomain']['name'], boundItem: response['companyDomain']} : null;
                    response['newDemandDomains'] =  me._localizationService.mapNameToSelect2Item(response['demandDomains']);

                    this._companie = new CompanyFormModel(
                                            response.name, 
                                            response.email, 
                                            response.phone, 
                                            response.contactPerson, 
                                            response.address, 
                                            response['city'], 
                                            response.companyDomain, 
                                            response['newDemandDomains'],
                                            response['id'],
                                            response.website,
                                            response.latitude,
                                            response.longitude);
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