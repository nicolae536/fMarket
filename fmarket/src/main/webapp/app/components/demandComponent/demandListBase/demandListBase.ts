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
    @Input('hide-operation') hideOperation:boolean;

    @Output('demand-selected') selectDemandEmitter:EventEmitter<DemandAdminDto> = new EventEmitter<DemandAdminDto>();
    @Output('remove-demand') removeDemanddEmitter:EventEmitter<DemandAdminDto> = new EventEmitter<DemandAdminDto>();

    constructor(){}

    selectDemand(demand){
        this.selectDemandEmitter.emit(demand);
    }

    removeDemand($event, companie){
        this.removeDemanddEmitter.emit(companie);
    }
}