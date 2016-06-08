/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, Input, EventEmitter, Output} from "@angular/core";
import {DemandAdminDto} from "../../../models/demandAdminDto";

let template = require('./demandListBase.html');

@Component({
    selector: 'demand-list-component',
    template: template,
})
export class DemandListBaseComponent {
    @Input('demand-list') demandList:Array<DemandAdminDto> = new Array<DemandAdminDto>();
    @Input('hide-operation') hideOperation:boolean;

    @Output('demand-selected') selectDemandEmitter:EventEmitter<DemandAdminDto> = new EventEmitter<DemandAdminDto>();
    @Output('remove-demand') removeDemanddEmitter:EventEmitter<DemandAdminDto> = new EventEmitter<DemandAdminDto>();

    constructor() {
    }

    selectDemand(demand) {
        this.selectDemandEmitter.emit(demand);
    }

    removeDemand($event, companie) {
        this.removeDemanddEmitter.emit(companie);
    }
}