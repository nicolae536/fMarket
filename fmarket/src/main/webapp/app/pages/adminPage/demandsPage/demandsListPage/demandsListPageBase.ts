/**
 * Created by nick_ on 4/22/2016.
 */
import {Router} from '@angular/router-deprecated';
import {Response} from "@angular/http";
import {DemandService} from "../../../../services/demandService";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandAdminDto} from "../../../../models/demandAdminDto";
import * as _ from 'underscore';
import {DemandStatus} from "../../../../models/DemandStatus";
import {IMenuItem} from "../../../../models/interfaces/iMenuItem";
import {MenuTreeDialog} from "../../../../components/menuComponent/menuTreeDialog/menuTreeDialog";
import {CategoriesMenuService} from "../../../../services/categoriesMenuService";
import {DemandSearchObject} from "../../../../models/DemandSearchObject";

export class DemandsListPageBase {
    //components
    private _menuTreeDialog:MenuTreeDialog;

    //services
    public _demandService:DemandService;
    public _requestTypeService:RequestTypeService;
    private _categoriesMenuService:CategoriesMenuService;
    private _router:Router;

    // containers
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

    constructor(router:Router ,_categoriesMenuService:CategoriesMenuService, _demandService:DemandService, _requestTypeService:RequestTypeService) {
        this._categoriesMenuService = _categoriesMenuService;
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._demandsRoute = "";
        this._searchObject = new DemandSearchObject('', 1, DemandStatus.PENDING, -1);
        this._searchObject.domainName = "Alege domeniu...";
        this._router = router;
    }

    showDomainsDialog(){
        this._menuTreeDialog.showMenuTreeDialog();
    }

    public getAllDemandsList():void {
        let me = this;
        this._demandService.getDemandsWithFilters(this._searchObject)
            .map((response)=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
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
            .map((response:Response) => {
                if (response.text().length > 0) {
                    return response.json();
                }
            }).subscribe(
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
            .map((response)=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
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
        this._demandService.getCityList()
            // .map((response)=> {
            //     if (response.text().length > 0) {
        //         return response.json();
            //     }
            // })
            .subscribe(
                response => {
                    me._citiesList = _.map(response, (city) => {
                        return {
                            displayName: city['name'],
                            boundItem: city
                        };
                    });
                },
                error => {

                }
            )
    }

    public getDomains():void {
        let me = this;
        this._requestTypeService.getRequestTypesWithFilters()
            .map((response)=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
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
        this._router.navigate(['/Admin/EditDemand', {id:demand.id}]);
    }
}