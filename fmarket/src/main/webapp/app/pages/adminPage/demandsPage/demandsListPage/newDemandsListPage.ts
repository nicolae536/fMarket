/**
 * Created by nick_ on 4/23/2016.
 */

import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {RequestTypeService} from "../../../../services/requestTypeService";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {LocalizationService} from "../../../../services/localizationService";

import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {DemandsListPageBase} from "./demandsListPageBase";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";
import {NotificationService} from "../../../../services/notificationService";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'new-demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent, MenuTreeDialog]
})
export class NewDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges{
    pageName = 'new-demands';
    constructor(router:Router,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                _localizationService:LocalizationService,
                _notificationService:NotificationService){
        super(router,_categoriesMenuService, _demandService,_requestTypeService, _localizationService, _notificationService);
        this._demandsRoute = '/new';
    }

    public ngOnInit():any {
        //this.getCities();
        this.getNewDemandsList();
    }

    removeDemand(demand){
        let me =this;
        this._demandService.declineDemand(demand)
            .subscribe(
                response => {
                    me.getNewDemandsList();
                },
                error => {
                    me.getNewDemandsList();
                }
            )
    }

    public ngOnChanges(changes:{}):any {
        /*if(changes && changes['_demandsList']){
            this.getDomains();
        }*/
    }
}