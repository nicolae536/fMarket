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

@Component({
    selector:'companies-edit-page',
    templateUrl:'/app/pages/adminPage/companiesPage/companiesEditPage/companiesEditPage.html',
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
            .map(response=>{
                if(response.text().length>0){
                    return response.json();
                }
            })
            .subscribe(
                succes=>{
                    me._location.back();
                },
                error=>{
                    //me.
                }
            );
    }
}