/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, Input } from "angular2/core";
import {Select2Item} from "../../selectComponent/selectComponent";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {DemandAdminDto} from "../../../models/demandAdminDto";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandListBase';

@Component({
    selector: 'demand-list-component',
    templateUrl: APPLICATION_PATH + '/demandListBase.html',
    directives:[ROUTER_DIRECTIVES]
})
export class DemandListBaseComponent {
    @Input('demand-list') demandList:Array<DemandAdminDto> = new Array<DemandAdminDto>();
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