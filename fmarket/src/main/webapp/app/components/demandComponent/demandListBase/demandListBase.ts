/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, OnInit, Input, EventEmitter, Output} from "angular2/core";
import {Demand} from "../demandComponent";
import {Select2Item} from "../../selectComponent/selectComponent";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandListBase';

@Component({
    selector: 'demand-list-component',
    templateUrl: APPLICATION_PATH + '/demandListBase.html',
    directives:[ROUTER_DIRECTIVES]
})
export class DemandListBaseComponent {
    @Input('demand-list') demandList:Array<Demand> = new Array<Demand>();
    @Input('domains-list') domainList:Array<Select2Item> = new Array<Select2Item>();
    @Input('cities-list') citiesList:Array<Select2Item> = new Array<Select2Item>();
    private _router;

    constructor(router:Router){
        this._router = router;

    }

    navigateToDetails(demand){
        this._router.navigate(['Admin/Demands/EditDemand', {id: demand.id}]);
    }
}