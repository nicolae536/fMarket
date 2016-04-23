/**
 * Created by nick_ on 4/22/2016.
 */
import {Component, OnInit, OnChanges} from "angular2/core";
import {DemandListBaseComponent} from "../../../../components/demandComponent/demandListBase/demandListBase";
import {Demand} from "../../../../components/demandComponent/demandComponent";
import {DemandService} from "../../../../services/demandService";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {RequestTypeService} from "../../../../services/requestTypeService";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsListPage';

@Component({
    selector: 'demands-list-page',
    templateUrl: applicationPath + '/demandsListPage.html',
    styleUrls: [applicationPath + '/demandsListPage.css'],
    directives: [DemandListBaseComponent],
    providers: [DemandService, RequestTypeService]
})
export class DemandsListPage implements OnInit, OnChanges {
    public _demandService:DemandService;
    public _requestTypeService:RequestTypeService;

    public _demandsList:Array<Demand> = new Array<Demand>();
    public _domainsList:Array<Select2Item>;
    public _cityesList:Array<Select2Item>;
    public _demandsRoute;
    
    constructor(_demandService:DemandService, _requestTypeService:RequestTypeService) {
        this._demandService = _demandService;
        this._requestTypeService = _requestTypeService;
        this._demandsRoute = "";
    }

    public ngOnInit():any {
        this.getCities();
        this.getDemandsList(this._demandsRoute);
    }

    public ngOnChanges(changes:{}):any {
        if(changes && changes['_demandsList']){
            this.getDomains();
        }
    }

    public getDemandsList(demandsType:string):void {
        let me = this;
        this._demandService.getDemands(demandsType)
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