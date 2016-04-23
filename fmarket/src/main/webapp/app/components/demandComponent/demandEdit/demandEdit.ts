/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "angular2/core";
import {Select2Item, SelectComponent} from "../../selectComponent/selectComponent";
import {Demand} from "../demandComponent";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandEdit';

@Component({
    selector: 'demand-edit-component',
    templateUrl: APPLICATION_PATH + '/demandEdit.html',
    directives:[SelectComponent]
})
export class DemandEditComponent {
    @Input('demand') _demand:Demand;
    @Input('domains-list') domainList:Array<Select2Item> = new Array<Select2Item>();
    @Input('cities-list') citiesList:Array<Select2Item> = new Array<Select2Item>();
    @Output('reject-demand') rejectDemandEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output('accept-demand') acceptDemandEvent: EventEmitter<Demand> = new EventEmitter<Demand>();
    @Output('save-demand') saveDemandEvent: EventEmitter<Demand> = new EventEmitter<Demand>();

    constructor() {}

    acceptDemand(){
        this.acceptDemandEvent.emit(this._demand);
    }

    rejectDemand(){
        this.rejectDemandEvent.emit(Number(this._demand.id));
    }

    toggleEditMode(){
        this._demand.isInEditMode = true;
    }

    saveEditedDemand(){
        this.saveDemandEvent.emit(this._demand);
    }
}