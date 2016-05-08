/**
 * Created by nick_ on 4/22/2016.
 */

import {Component, OnInit} from "@angular/core";
import {RouteParams, Router, CanActivate} from "@angular/router-deprecated";

import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandEditComponent} from "../../../../components/demandComponent/demandEdit/demandEdit";
import {Demand} from "../../../../models/demand";
import {Role} from "../../../../models/Roles";
import {AuthorizationService} from "../../../../services/authorizationService";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsEditPage';

@Component({
    selector: 'demands-edit-page',
    templateUrl: applicationPath + '/demandsEditPage.html',
    styleUrls: [applicationPath + '/demandsEditPage.css'],
    directives: [DemandEditComponent]
})
@CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class DemandsEditPage implements OnInit {
    private _router:Router;
    private _demandService:DemandService;
    private _requestTypeService:RequestTypeService;

    private _demandId:number;
    _demand;
    _domainsList;
    _cityesList;

    constructor(router:Router, params:RouteParams, demandService:DemandService, requestTypeService:RequestTypeService)
    {
        this._router = router;
        this._demandService = demandService;
        this._requestTypeService = requestTypeService;
        this._demandId = Number(params.get('id'))
    }
    
    ngOnInit():any {
        this.getDemand();
    }

    private getDemand() {
        let me=this;

        this._demandService.getDemand(this._demandId)
            .map((response)=> {
                if (response.text().length > 0) {
                    return response.json();
                }
            })
            .subscribe(
                response => {
                    me._demand = response;
                },
                error=>{

                })
    }


    private getCities():void {
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

    private getDomains():void {
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

    private acceptDemand(demand:Demand){
        let me=this;

        this._demandService.acceptDemand(demand)
            .map((response)=>{
                if(response.text().length > 0){
                    return response.json();
                }
            })
            .subscribe(
                response =>{
                    me._router.navigate(['Admin/Demands/DemandsList']);
                },
                error =>{

                }
            );
    }

    private rejectDemand(id:number){
        let me=this;

        this._demandService.declineDemand(id)
            .map((response)=>{
                if(response.text().length > 0){
                    return response.json();
                }
            })
            .subscribe(
                response =>{
                    me._router.navigate(['Admin/Demands/DemandsList']);
                },
                error =>{

                }
            );
    }

    private saveEditedDemand(demand:Demand){
        let me=this;

        this._demandService.saveDemand(demand)
            .map((response)=>{
                if(response.text().length > 0){
                    return response.json();
                }
            })
            .subscribe(
                response =>{
                    me._router.navigate(['Admin/Demands/DemandsList']);
                },
                error =>{

                }
            );
    }
}