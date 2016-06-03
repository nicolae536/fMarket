/**
 * Created by nick_ on 4/26/2016.
 */
import * as _ from 'underscore';

import {Component, OnInit, OnChanges} from "@angular/core";
import {Router} from "@angular/router";

import {DemandService} from "../../../services/demandService";
import {RequestTypeService} from "../../../services/requestTypeService";
import {CategoriesMenuService} from "../../../services/categoriesMenuService";
import {LocalizationService} from "../../../services/localizationService";
import {NotificationService} from "../../../services/notificationService";

import {DemandsListPageBase} from "../../adminPage/demandsPage/demandsListPage/demandsListPageBase";
import {DemandStatus} from "../../../models/DemandStatus";


var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-demands-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html'
})
export class AccountDemandsPage extends DemandsListPageBase implements OnInit, OnChanges {

    //<editor-fold desc="Variables">
    selectedFilter:string;
    backendDemands:Array<Object>;
    //</editor-fold>

    constructor(router:Router,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                localizationService:LocalizationService,
                _notificationService:NotificationService) {
        super(router, _categoriesMenuService, _demandService, _requestTypeService, localizationService, _notificationService);
    }

    ngOnInit():any {
        this.getUserDemandsWithFilter();
    }

    ngOnChanges(changes:{}):any {

    }

    getDemandsWithFilter(filtru){
        let me=this;
        this.selectedFilter = filtru;

        this._demandService.getUserDemandsWithFilter()
            .subscribe(
                response=>{
                    me.backendDemands = response;
                    me.fatchDemandsUsingFilters();
                }
            )
    }

    fatchDemandsUsingFilters(){
        switch(this.selectedFilter){
            case DemandStatus.ACTIVE:
                this.filterDemands([DemandStatus.ACTIVE]);
                break;
            case DemandStatus.PENDING + '&&' +DemandStatus.IN_REVIEW:
                this.filterDemands([DemandStatus.PENDING, DemandStatus.IN_REVIEW]);
                break;
            case DemandStatus.REJECTED + '&&' +DemandStatus.CLOSED:
                this.filterDemands([DemandStatus.REJECTED, DemandStatus.CLOSED]);
                break;
        }
    }

    filterDemands(filters:Array<string>){
        let me=this;
        let colector=[];
        _.each(filters, (filter)=>{
            let filtredDemands = _.where(me._demandsList, {status: filter});
            colector = colector.concat(filtredDemands);
        });

        this._demandsList = colector;
    }

    private getUserDemandsWithFilter() {
        let me = this;
        this._demandService.getUserDemandsWithFilter(this._searchObject)
            .subscribe(
                response=> {
                    me._demandsList = response;
                },
                error=> {

                }
            )
    }
}