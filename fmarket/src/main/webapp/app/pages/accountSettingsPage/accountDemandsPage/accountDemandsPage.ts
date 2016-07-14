/**
 * Created by nick_ on 4/26/2016.
 */
import * as _ from 'underscore';

import {Component, OnInit, OnChanges} from "@angular/core";

import {DemandService} from "../../../services/demandService";
import {DemandStatus} from "../../../models/DemandStatus";
import {DemandListBaseComponent} from "../../../components/demandComponent/demandListBase/demandListBase";

import * as template from './accountDemandsPage.html';

@Component({
    selector: 'account-demands-Page',
    template:template,
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