/**
 * Created by nick_ on 4/22/2016.
 */

import {Component, OnInit} from "@angular/core";
import {Router, OnActivate, RouteSegment, RouteTree} from "@angular/router";
import {Location} from '@angular/common'

import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandEditComponent} from "../../../../components/demandComponent/demandEdit/demandEdit";
import {NotificationService} from "../../../../services/notificationService";

import {Demand} from "../../../../models/demand";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";

let applicationPath:string = '/app/pages/adminPage/demandsPage/demandsEditPage';

@Component({
    selector: 'demands-edit-page',
    templateUrl: applicationPath + '/demandsEditPage.html',
    styleUrls: [applicationPath + '/demandsEditPage.css'],
    directives: [DemandEditComponent]
})
// @CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class DemandsEditPage implements OnInit, OnActivate {
    private _router:Router;
    private _demandService:DemandService;
    private _notificationService:NotificationService;
    private _requestTypeService:RequestTypeService;
    private _location:Location;
    private _demandId:number;
    private _demandDomains:Array<Select2Item>;

    _demand;
    constructor(router:Router, _location: Location, demandService:DemandService, requestTypeService:RequestTypeService,
                notificationService:NotificationService)
    {
        this._location = _location;
        this._notificationService = notificationService;
        this._router = router;
        this._demandService = demandService;
        this._requestTypeService = requestTypeService;
    }

    routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
        this._demandId = Number(curr.getParam('id'))
    }

    ngOnInit():any {
        this.getDomains();
    }

    private getDemand() {
        let me=this;

        this._demandService.getDemand(this._demandId)
            .subscribe(
                response => {
                    me._demand = response;
                    me._demand['selectedDomain']= me.getDomainById(me._demand.domainId);
                    console.log(me._demand['selectedDomain']);
                },
                error=>{

                })
    }

    private getDomains(){
        let me=this;

        this._demandService.getDemandDomanins()
            .subscribe(
                response => {
                    me._demandDomains = me._demandService.mapNameToSelect2Item(response);
                    me.getDemand();
                },
                error=>{
                    me._demandDomains = new Array<Select2Item>();
                })
    }

    private getDomainById(demandId){
        for(var obj of this._demandDomains){
            if(obj['boundItem']['id'] === demandId){
                return obj;
            }
        }

        return null;
    }

    navigateToList($event){
        this._location.back();
    }

    private acceptDemand(demand:Demand){
        let me=this;

        this._demandService.acceptDemand(demand)
            .subscribe(
                response =>{
                    me._location.back();
                    me._notificationService.emitSuccessNotificationToRootComponent('Cerere activata cu success',3);
                },
                error =>{
                    me._notificationService.emitErrorNotificationToRootComponent('Cerere nu a putut fi activata !',3);
                }
            );
    }

    private rejectDemand(id:number){
        let me=this;

        this._demandService.declineDemand(id)
            .subscribe(
                response =>{
                    me._location.back();
                },
                error =>{
                    me._notificationService.emitErrorNotificationToRootComponent('Erroare de server cererea nu poate fi refuzata !',3);
                }
            );
    }

    private saveEditedDemand(demand:Demand){
        let me=this;

        this._demandService.saveDemand(demand)
            .subscribe(
                response =>{
                    me._location.back();
                },
                error =>{
                    me._notificationService.emitErrorNotificationToRootComponent('Cerere nu poate fi salvata !',3);
                }
            );
    }
}