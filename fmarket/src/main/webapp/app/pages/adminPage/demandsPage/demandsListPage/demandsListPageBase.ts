/**
 * Created by nick_ on 4/22/2016.
 */
import {DemandService} from "../../../../services/demandService";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandAdminDto} from "../../../../models/demandAdminDto";

export class DemandsListPageBase {
    public _demandService:DemandService;
    public _requestTypeService:RequestTypeService;

    public _demandsList:Array<DemandAdminDto>;
    public _domainsList:Array<Select2Item>;
    public _cityesList:Array<Select2Item>;
    public _demandsRoute;
    public _searchObject:Object;

    constructor(_demandService:DemandService, _requestTypeService:RequestTypeService) {
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._demandsRoute = "";
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
                    me._demandsList = response;
                },
                error => {

                }
            )
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
                    me._cityesList = _.map(response, (city) => {
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
}