/**
 * Created by nick_ on 4/22/2016.
 */
import * as _ from 'underscore';

import {Router} from '@angular/router';

import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {LocalizationService} from "../../../../services/localizationService";

import {NotificationService} from "../../../../services/notificationService";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {DemandAdminDto} from "../../../../models/demandAdminDto";
import {DemandStatus} from "../../../../models/DemandStatus";
import {IMenuItem} from "../../../../models/interfaces/iMenuItem";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";
import {DemandSearchObject} from "../../../../models/DemandSearchObject";

export class DemandsListPageBase {

    //<editor-fold desc="Services">
    public _demandService:DemandService;
    public _requestTypeService:RequestTypeService;
    private _categoriesMenuService:CategoriesMenuService;
    private _localizationService:LocalizationService;
    private _notificationService:NotificationService;
    private _router:Router;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _menuTreeDialog:MenuTreeDialog;
    public _demandsList:Array<DemandAdminDto>;
    public _domainsList:Array<Select2Item>;
    public _citiesList:Array<Select2Item>;
    public _demandsRoute;
    public _searchObject:DemandSearchObject;
    public totalPages:number;
    public menuDictionary;
    public statusList = [{status:DemandStatus.ACTIVE, displayName:DemandStatus.ACTIVE},
        {status:DemandStatus.CLOSED, displayName:DemandStatus.CLOSED},
        {status:DemandStatus.IN_REVIEW, displayName:DemandStatus.IN_REVIEW},
        {status:DemandStatus.PENDING, displayName:DemandStatus.PENDING},
        {status:DemandStatus.REJECTED, displayName:DemandStatus.REJECTED},
        {status:DemandStatus.WAITING_FOR_REVIEW, displayName:DemandStatus.WAITING_FOR_REVIEW}];
    //</editor-fold>

    constructor(router:Router ,
                _categoriesMenuService:CategoriesMenuService,
                _demandService:DemandService,
                _requestTypeService:RequestTypeService,
                _localizationService:LocalizationService,
                _notificationService:NotificationService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._notificationService = _notificationService;
        this._demandsRoute = "";
        this._searchObject = new DemandSearchObject('', 1, DemandStatus.WAITING_FOR_REVIEW, -1);
        this._searchObject.domainName = "Alege domeniu...";
        this._router = router;
        this._localizationService=_localizationService;
    }

    showDomainsDialog(){
        this._menuTreeDialog.showMenuTreeDialog();
    }

    public getAllDemandsList():void {
        let me = this;
        this._demandService.getDemandsWithFilters(this._searchObject)
            .subscribe(
                response => {
                    me._demandsList = response.data;
                    me.totalPages = response.totalPages;
                    me._searchObject.page = response.page;
                },
                error => {

                }
            )
    }

    public getMenuDictionary():void {
        var me = this;
        this._categoriesMenuService.getMenuDictionary()
            .subscribe(
                response => {
                    me.menuDictionary = response;
                },
                error => {
                    me.menuDictionary = [];
                });
    }

    public getNewDemandsList() {
        let me = this;
        this._demandService.getNewDemands()
            .subscribe(
                response => {
                    me._demandsList = response;
                },
                error => {

                }
            )
    }

    referenceDialogInDemandComponent(menuItemsModal){
        this._menuTreeDialog = menuItemsModal;
    }

    selectItemUsingMenu(item:IMenuItem){
        this._searchObject.domainName = item.name;
        this._searchObject.domainId = item.domainId;
    }

    public getCities():void {
        let me = this;
        this._localizationService.getCityList()
            .subscribe(
                response => {
                    me._citiesList = me._localizationService.mapNameToSelect2Item(response)
                },
                error => {

                }
            )
    }

    public getDomains():void {
        let me = this;
        this._requestTypeService.getRequestTypesWithFilters()
            .subscribe(
                response => {
                    me._domainsList = _.map(response, (domain) => {
                        return {
                            displayName: domain['name'],
                            boundItem: domain
                        };
                    });
                },
                error => {

                }
            )
    }

    navigateToDemand(demand:DemandAdminDto){
        this._router.navigate([`/admin/cerere-detalii/${demand.id}`]);
    }
}