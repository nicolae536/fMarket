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
import {DemandListBaseComponent} from "../../../components/demandComponent/demandListBase/demandListBase";


var applicationPath:string = '/app/pages/accountSettingsPage/accountDemandsPage';

@Component({
    selector: 'account-demands-Page',
    templateUrl: applicationPath + '/accountDemandsPage.html',
    directives:[DemandListBaseComponent]
})
export class AccountDemandsPage implements OnInit, OnChanges {
    private _demandService:DemandService;


    //<editor-fold desc="Variables">
    selectedFilter:string;
    backendDemands:Array<Object>;
    _demandsList
    //</editor-fold>

    constructor(_demandService:DemandService) {
        this._demandService =_demandService;
    }

    ngOnInit():any {
        this.getDemandsWithFilter(DemandStatus.ACTIVE);
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
                },
                reject=>{
                    
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
            let filtredDemands = _.where(me.backendDemands, {status: filter});
            colector = colector.concat(filtredDemands);
        });

        this._demandsList = colector;
    }

    // private getUserDemandsWithFilter() {
    //     let me = this;
    //     this._demandService.getUserDemandsWithFilter()
    //         .subscribe(
    //             response=> {
    //                 me._demandsList = response;
    //             },
    //             error=> {
    //
    //             }
    //         )
    // }
}