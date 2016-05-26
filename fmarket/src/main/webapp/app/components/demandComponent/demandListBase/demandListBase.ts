/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, Input, EventEmitter, Output } from "@angular/core";
import {Select2Item} from "../../selectComponent/selectComponent";
import {DemandAdminDto} from "../../../models/demandAdminDto";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandListBase';

@Component({
    selector: 'demand-list-component',
    templateUrl: APPLICATION_PATH + '/demandListBase.html',
})
export class DemandListBaseComponent {
    @Input('demand-list') demandList:Array<DemandAdminDto> = new Array<DemandAdminDto>();
    @Input('domains-list') domainList:Array<Select2Item> = new Array<Select2Item>();
    @Input('cities-list') citiesList:Array<Select2Item> = new Array<Select2Item>();

    @Output('demand-selected') selectDemandEmitter:EventEmitter<DemandAdminDto> = new EventEmitter<DemandAdminDto>();

    constructor(){}

    selectDemand(demand){
        this.selectDemandEmitter.emit(demand);
    }
}