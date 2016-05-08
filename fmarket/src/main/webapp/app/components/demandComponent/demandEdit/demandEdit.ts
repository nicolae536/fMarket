/**
 * Created by nick_ on 4/20/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Select2Item, SelectComponent} from "../../selectComponent/selectComponent";
import {DemandDetailsDTO} from "../../../models/demandDetailsDTO";

const APPLICATION_PATH:string = '/app/components/demandComponent/demandEdit';

@Component({
    selector: 'demand-edit-component',
    templateUrl: APPLICATION_PATH + '/demandEdit.html',
    directives:[SelectComponent]
})
export class DemandEditComponent {
    @Input('demand') _demand:DemandDetailsDTO;
    @Input('domains-list') domainList:Array<Select2Item> = new Array<Select2Item>();
    @Input('cities-list') citiesList:Array<Select2Item> = new Array<Select2Item>();
    @Output('reject-demand') rejectDemandEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output('accept-demand') acceptDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();
    @Output('save-demand') saveDemandEvent: EventEmitter<DemandDetailsDTO> = new EventEmitter<DemandDetailsDTO>();

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
        this._demand.isInEditMode = false;
        this.saveDemandEvent.emit(this._demand);
    }
}