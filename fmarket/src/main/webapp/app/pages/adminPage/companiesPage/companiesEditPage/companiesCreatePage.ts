/**
 * Created by nick_ on 5/6/2016.
 */

import {OnInit, Component} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {CompaniesService} from "../../../../services/companiesService";
import {NotificationService} from "../../../../services/notificationService";
import {CompaniesEditComponent} from "../../../../components/companieComponent/companieEditComponent/companiesEditComponent";
import {CompaniesEditBase} from "./companiesEditBase";
import {LocalizationService} from "../../../../services/localizationService";
import {NewCompanyRequest} from "../../../../models/newCompanyRequest";
let template = require('./companiesEditPage.html');

@Component({
    selector:'companies-edit-page',
    template:template,
    directives:[CompaniesEditComponent]
})
export class CompanieCreatePage extends CompaniesEditBase implements OnInit {
    
    constructor(location:Location,
                router:Router,
                companiesService:CompaniesService,
                notificationService:NotificationService,
                localizationService:LocalizationService) {
        super(location, router, companiesService, notificationService, localizationService);
    }

    ngOnInit() {
        this.getCities();
        this.getCompanieDomains();
        this.getDomains();
    }

    saveCompanie(companieDto:NewCompanyRequest){
        let me = this;
        this._companiesService.createCompany(companieDto)
            .subscribe(
                succes=>{
                    if(companieDto['logoFile']){
                        me.uploadLogoFile(succes, companieDto['logoFile']);
                        return;
                    }
                    me._location.back();
                },
                error=>{
                    //me.
                }
            );
    }

    uploadLogoFile(id, logoFile){
        let me = this;

        this._companiesService.uploadCompanyLogo(id, logoFile)
            .subscribe(
                succes=>{
                    me._location.back();
                },
                error=>{
                    
                }
            );
    }
}