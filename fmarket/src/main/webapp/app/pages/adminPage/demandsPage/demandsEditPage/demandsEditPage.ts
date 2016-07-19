/**
 * Created by nick_ on 4/22/2016.
 */

import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common'

import {DemandService} from "../../../../services/demandService";
import {RequestTypeService} from "../../../../services/requestTypeService";
import {DemandEditComponent} from "../../../../components/demandComponent/demandEdit/demandEdit";
import {NotificationService} from "../../../../services/notificationService";

import {Demand} from "../../../../models/demand";
import {Select2Item} from "../../../../components/selectComponent/selectComponent";
import {RejectDemandDialogComponent} from "../../../../components/demandComponent/rejectDemandDialogComponent/rejectDemandDialogComponent";

let template = require('./demandsEditPage.html');

@Component({
    selector: 'demands-edit-page',
    template: template,
    //styleUrls: [applicationPath + '/demandsEditPage.css'],
    directives: [DemandEditComponent, RejectDemandDialogComponent]
})
// @CanActivate(()=>{return AuthorizationService.isLoggedIn() && AuthorizationService.hasRole(Role.ADMIN);})
export class DemandsEditPage implements OnInit {
    //<editor-fold desc="Services">
    private _router:Router;
    private _demandService:DemandService;
    private _notificationService:NotificationService;
    private _requestTypeService:RequestTypeService;
    private _location:Location;
    private _activatedRoute:ActivatedRoute;
    //</editor-fold>

    //<editor-fold desc="Variables">
    private _demandId:number;
    private _demandDomains:Array<Select2Item>;
    private rejectDemandDialog:RejectDemandDialogComponent;
    _demand;
    //</editor-fold>

    constructor(router:Router, _location: Location, demandService:DemandService, requestTypeService:RequestTypeService,
                notificationService:NotificationService, activatedRoute:ActivatedRoute)
    {
        this._location = _location;
        this._notificationService = notificationService;
        this._router = router;
        this._demandService = demandService;
        this._requestTypeService = requestTypeService;
        this._activatedRoute = activatedRoute;
    }

    ngOnInit():any {        
        this._activatedRoute.params.subscribe(params =>{
            this._demandId = params['id'];
            this.getDomains();
        });
    }

    private rejectDemandDialogLoaded($event:RejectDemandDialogComponent){
        this.rejectDemandDialog = $event;
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

    private navigateToList($event){
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

    private showRejectDemandDialog(){
        this.rejectDemandDialog.show();
    }

    private rejectDemand(response:Object){
        let me=this;
        response['id']=this._demand.id;

        this._demandService.declineDemand(response)
            .subscribe(
                response =>{
                    me.rejectDemandDialog.hide();
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