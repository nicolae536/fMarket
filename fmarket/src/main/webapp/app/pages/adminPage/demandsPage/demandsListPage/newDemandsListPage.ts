/**
 * Created by nick_ on 4/23/2016.
 */

import {Component, OnChanges, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandsListPageBase} from "./demandsListPageBase";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";
import {LocalizationService} from "../../../../services/localizationService";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'new-demands-list-page',
    templateUrl: applicationPath + '/demandsListPageBase.html',
    styleUrls: [applicationPath + '/demandsListPageBase.css'],
    directives: [DemandListBaseComponent, MenuTreeDialog]
})
export class NewDemandsListPage extends DemandsListPageBase implements OnInit, OnChanges{
    pageName='new-demands';
    constructor(router:Router,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                _localizationService:LocalizationService){
        super(router,_categoriesMenuService, _demandService,_requestTypeService, _localizationService);
        this._demandsRoute = '/new';
    }

    public ngOnInit():any {
        //this.getCities();
        this.getNewDemandsList();
    }

    public ngOnChanges(changes:{}):any {
        /*if(changes && changes['_demandsList']){
            this.getDomains();
        }*/
    }
}